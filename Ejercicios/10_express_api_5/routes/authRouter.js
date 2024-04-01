// importamos express
const express = require("express");
// Importamos bbdd
const { USERS_BBDD } = require("../bbdd.js");
// Importamos checkEmailPassword
const checkEmailPassword = require("../utils/checkEmailPassword");

const authRouter = express.Router();

// Endpoint público (no autenticado y no autorizado)
authRouter.get("/public", (req, res) => res.send("Endpoint publico"));

// Endpoint autenticado para todo usuario registrado
authRouter.post("/autenticado", async (req, res) => {
	// Obtenemos el email y el password del body
	const { email, password } = req.body;

	// Si no existe alguno de estos campos devolvemos un 400 (bad request)
	if (!email || !password) return res.sendStatus(400);

	try {
		// Llamamos a la funcion de validar el email y password
		const user = await checkEmailPassword(email, password);

		// Si todo sale bien respondemos con un 200 (ok)
		return res.send(`Usuario ${user.name} autenticado`);
	} catch (error) {
		return res.sendStatus(401);
	}
});

// Endpoint autorizado a administradores
authRouter.post("/autorizado", async (req, res) => {
	// Obtenemos el email y el password del body
	const { email, password } = req.body;

	// Si no existe alguno de estos campos devolvemos un 400 (bad request)
	if (!email || !password) return res.sendStatus(400);

	try {
		// Llamamos a la funcion de validar el email y password
		const user = await checkEmailPassword(email, password);

		// Si el rol del usuario no es administrador devolvemos un 403 (forbidden)
		if (user.role !== "Admin") return res.sendStatus(403);

		// Si todo sale bien respondemos con un 200 (ok)
		return res.send(`Usuario ${user.name} autenticado`);
	} catch (error) {
		return res.sendStatus(401);
	}
});

module.exports = authRouter;

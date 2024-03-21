// Importamos express
const express = require("express");
// Importamos uuid
const { v4: uuidv4 } = require("uuid");

// Importamos checkEmailPassword
const checkEmailPassword = require("../utils/checkEmailPassword");

const authSessionRouter = express.Router();

const sessions = [];
authSessionRouter.post("/login", async (req, res) => {
	// Obtenemos el email y el password del body
	const { email, password } = req.body;
	// Si no existe alguno de esos dos campos devolvemos un 400 (bad request)
	if (!email || !password) return res.sendStatus(400);

	try {
		// Llamamos a la funcion de validar el email y password y obtenemos el guid
		const { guid } = await checkEmailPassword(email, password);

		// Generamos un identificador con la libreria uuid
		const sessionId = uuidv4();

		// Añadimos el sessionId al array de sessions
		sessions.push({ sessionId, guid });

		// Escribimos en la cookie el sessionId con la opcion httpOnly
		res.cookie("SessionId", sessionId, { httpOnly: true });

		// Si todo es correcto enviamos la respuesta. 200 OK
		return res.send(`Usuario logueado`);
	} catch (error) {
		console.log(error);
		// Si el usuario no existe enviamos un 401 (unauthorized)
		return res.sendStatus(401);
	}
});

module.exports = authSessionRouter;

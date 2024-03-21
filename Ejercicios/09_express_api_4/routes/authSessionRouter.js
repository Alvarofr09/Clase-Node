// Importamos express
const express = require("express");
// Importamos uuid
const { v4: uuidv4 } = require("uuid");

// Importamos checkEmailPassword
const checkEmailPassword = require("../utils/checkEmailPassword");
const { USERS_BBDD } = require("../bbdd");

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
		res.cookie("sessionId", sessionId, { httpOnly: true });

		// Si todo es correcto enviamos la respuesta. 200 OK
		return res.send(`Usuario logueado`);
	} catch (error) {
		console.log(error);
		// Si el usuario no existe enviamos un 401 (unauthorized)
		return res.sendStatus(401);
	}
});

authSessionRouter.get("/profile", (req, res) => {
	// Obtenemos las cookies
	const { cookies } = req;

	// Si la cookie no existe enviamos un 401 (unauthorized)
	if (!cookies.sessionId) return res.sendStatus(401);

	// Buscamos la sesion recibida en el array de sesiones
	const userSession = sessions.find(
		(session) => session.sessionId === cookies.sessionId
	);

	// Si no existe la sesion enviamos un 401 (unauthorized)
	if (!userSession) return res.sendStatus(401);

	// Obtenemos los datos del usuario a traves del guid
	const user = USERS_BBDD.find((user) => (user.guid = userSession.guid));

	// Si no obtenemos el usuario enviamos un 401 (unauthorized)
	if (!user) return res.sendStatus(401);

	// Borramos la contraseña

	// Y devolvemos los datos del usuario
	return res.send(user);
});
module.exports = authSessionRouter;

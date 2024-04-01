const express = require("express");
const { SignJWT, jwtVerify } = require("jose");

const { USERS_BBDD } = require("../bbdd");
const checkEmailPassword = require("../utils/checkEmailPassword");

const authTokenRouter = express.Router();

authTokenRouter.post("/login", async (req, res) => {
	//Obtenemos el email y password del body
	const { email, password } = req.body;
	// Si no existe alguno de esos dos campos devolvemos un 400 (bad request)
	if (!email || !password) return res.sendStatus(400);

	try {
		// Validamos el email y password y obtenemos el guid
		const { guid } = await checkEmailPassword(email, password);

		// GENERAR TOKEN Y DEVOLVER TOKEN
		// Construimos el JWT con el guid
		const jwtConstructor = new SignJWT({ guid });

		// Codificamos la clave secreta definida en la variable de entorno por requisito de la libreria jose
		// y poder pasarla en el formato correcto (uint8Array) en el metodo .sign
		const encoder = new TextEncoder();

		// Generamos el JWT. Lo hacemos asincrono, ya que nos devuelve una promesa.
		// Le indicamos la cabecera, la creacion, la expiracion y la firma (clave secreta)
		const jwt = await jwtConstructor
			.setProtectedHeader({ alg: "HS256", typ: "JWT" })
			.setIssuedAt()
			.setExpirationTime("1h")
			.sign(encoder.encode(process.env.JWT_SECRET));

		// Si todo es correcto enviamos la respuesta. 200 (ok)
		return res.send({ jwt });
	} catch (error) {
		console.log(error);

		// Si el usuario no existe devolvemos un 401 (unauthorized)
		return res.sendStatus(401);
	}
});

authTokenRouter.get("/profile", async (req, res) => {
	// OBTENER CABECERA Y COMPROBAR SU AUTENTICIDAD Y CADUCIDAD
	const { authorization } = req.headers;

	// Si no existe el token enviamos un 401 (unauthorized)
	if (!authorization) return res.sendStatus(401);

	try {
		const token = authorization.split(" ")[1];

		// Codificamos la clave secreta
		const encoder = new TextEncoder();

		// Verficamos el token con la funcion jwtVerify. Le pasamos el token y la clave secreta
		const { payload } = await jwtVerify(
			token,
			encoder.encode(process.env.JWT_SECRET)
		);

		// Obtenemos los datos del usuario a traves del guid
		const user = USERS_BBDD.find((user) => user.guid === payload.guid);

		// Si no obtenemos el usuario enviamos un 401 (unauthorized)
		if (!user) return res.sendStatus(401);

		// Borramos la password del objeto obtenido para no mostarla
		delete user.password;

		// Y devolvemos los datos del usuario
		return res.send(user);
	} catch (error) {
		console.log(error);

		// Si hay un error o el token expiro enviamos un 401 (unauthorized)
		return res.sendStatus(401);
	}
});

module.exports = authTokenRouter;

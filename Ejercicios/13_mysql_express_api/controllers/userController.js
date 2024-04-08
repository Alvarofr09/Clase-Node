const dao = require("../services/dao/userDao");
const { SignJWT, jwtVerify } = require("jose");
const md5 = require("md5");

const addUser = async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password)
		return res.status(400).send("Error en el body");

	// Buscamos el usuario en la base de datos
	try {
		const user = await dao.getUserByEmail(email);
		// Si existe el usuario respondemos con un 409 (conflict)
		if (user.length > 0) return res.status(409).send("Usuario ya registrado");
		// Si no existe lo registramos
		const userId = await dao.addUser(req.body);
		if (userId) return res.send(`Usuario ${name} con id ${userId}, registrado`);
	} catch (error) {
		console.log(error.message);
		throw new Error(error);
	}
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;

	// Si no existe alguno de estos campos devolvemos un 400 (bad request)
	if (!email || !password) return res.status(400).send("Error en el body");

	try {
		let user = await dao.getUserByEmail(email);
		if (user.length <= 0) return res.status(404).send("Usuario no registrado");
		// Pasamos md5 a la password recibida del cliente
		const clientPassword = md5(password);
		// Como la consulta a la base de datos nos devuelve un array cn el objeto del usuario usamos la destructuracion
		[user] = user;

		// Si la password no coincide respondemos con un 401 (unauthorized)
		if (user.password !== clientPassword) return res.sendStatus(401);

		// GENERAR TOKEN Y DEVOLVER TOKEN
		// Construimos el JWT con el id, email y rol del usuario
		const jwtConstructor = new SignJWT({
			id: user.id,
			email,
			role: user.userRole,
		});

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
		console.error(error.message);
		throw new Error(error);
	}
};

module.exports = {
	addUser,
	loginUser,
};

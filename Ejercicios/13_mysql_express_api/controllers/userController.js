const dao = require("../services/dao/userDao");
const { SignJWT, jwtVerify } = require("jose");
const md5 = require("md5");
const { verifyToken } = require("../utils/verifyToken");

const getProfileUser = async (req, res) => {
	try {
		const payload = await verifyToken(req);

		const userId = req.params.id;

		if (payload.id.toString() !== userId) return res.sendStatus(401);
		let user = await dao.getUserById(userId);

		[user] = user;
		delete user.password;
		if (user.length === 0) return res.status(404).send("Usuario no encontrado");

		return res.send(user);
	} catch (error) {
		console.log(error.mesagge);
		throw new Error(error.mesagge);
	}
};

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

const deleteUser = async (req, res) => {
	try {
		const payload = await verifyToken(req);

		if (!payload) return res.sendStatus(401);

		const { userId } = req.params;

		const user = await dao.getUserById(userId);
		if (user.length === 0)
			return res.status(404).send("No se encontro el usuario");

		const isUserDelete = await dao.deleteUser(userId);

		if (!isUserDelete)
			return res.status(500).send("No se ha podido borrar el usuario");

		return res.status(200).send(`Usuario con id: ${userId} borrado`);
	} catch (error) {
		console.log(error.message);
		throw new Error(error);
	}
};

const updateUser = async (req, res) => {
	try {
		const payload = verifyToken(req);

		if (!payload) return res.sendStatus(401);
		// Si no nos llega ningún campo por el body devolvemos un 400 (bad request)
		if (Object.entries(req.body).length === 0)
			return res.status(400).send("Error al recibir el body");

		const userId = req.params.id;

		// Buscamos si el id del usuario existe en la base de datos
		const user = await dao.getUserById(userId);

		if (user.length === 0) return res.status(404).send("el usuario no existe");

		const isUserUpdate = await dao.updateUser(userId, req.body);

		if (!isUserUpdate)
			return res.status(500).send("No se ha podido actualizar el usuario");

		return res.send(`Usuario con id ${userId} actualizado`);
	} catch (error) {
		console.log(error.message);
		throw new Error(error.message);
	}
};

module.exports = {
	getProfileUser,
	addUser,
	loginUser,
	deleteUser,
	updateUser,
};

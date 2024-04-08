const dao = require("../services/dao/userDao");

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

module.exports = {
	addUser,
};

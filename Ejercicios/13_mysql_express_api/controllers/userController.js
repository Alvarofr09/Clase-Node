const addUser = (req, res) => {
	const { email, password, name } = req.body;

	if (!email || !password || !name)
		return res.status(400).send("Error en el body");

	res.send("Añadir usuario");
};

module.exports = {
	addUser,
};

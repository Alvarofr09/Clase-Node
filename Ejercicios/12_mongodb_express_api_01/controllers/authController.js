// Importamos la funcion utilizada
const checkEmailPassword = require("../utils/checkEmailPassword");

const getPublic = (req, res) => res.send("Endpoint publico");

const login = async (req, res) => {
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
};

const loginAutorizado = async (req, res) => {
	// Obtenemos el email y el password del body
	const { email, password } = req.body;

	// Si no existe alguno de estos campos devolvemos un 400 (bad request)
	if (!email || !password) return res.sendStatus(400);

	try {
		// Llamamos a la funcion de validar el email y password
		const user = await checkEmailPassword(email, password);

		// Si el rol del usuario no es administrador devolvemos un 403 (forbidden)
		if (user.role !== "admin")
			return res.status(403).send("No estas autorizado");

		// Si todo sale bien respondemos con un 200 (ok)
		return res.send(`Usuario ${user.name} autenticado`);
	} catch (error) {
		return res.sendStatus(401);
	}
};

module.exports = { getPublic, login, loginAutorizado };

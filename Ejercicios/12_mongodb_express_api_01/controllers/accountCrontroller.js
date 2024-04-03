// Importamos bbdd
// const { USERS_BBDD } = require("../bbdd");
const userModel = require("../services/schemas/userSchema");

const getUser = async (req, res) => {
	// Buscamos los detalles de la cuenta a traves del guid recibido por req.params
	const { guid } = req.params;

	const user = await userModel.findById(guid);
	// Si no existe el usuario respondemos con un 404 (not found)
	if (!user) return res.status(404).send("Cuenta no encontrada");

	res.send(user);
};

const addUser = async (req, res) => {
	// Extremos el guid y el name del body. Obligamos que estén los dos campos para crear un usuario
	const { guid, name, mail } = req.body;
	// Si no existe guid o name devolvemos un 400 (bad request)
	if (!guid || !name || !mail) return res.status(400).send("Error en el body");

	// Buscamos si existe el guid
	const user = await userModel.findById(guid);

	// Si existe el usuario respondemos con un 409 (conflict)
	// Ya que no se puede crear una nueva cuenta con el mismo guid
	if (user) return res.status(409).send("Cuenta ya existente");

	// Instanciamos el modelo y lo guardamos
	const newUser = new userModel({ _id: guid, name, email: mail });
	await newUser.save();

	// Enviamos una respuesta 201 (created)
	res.sendStatus(201);
};

const updateUser = async (req, res) => {
	// Buscamos los detalles de la cuenta a traves del guid recibido por req.params
	const { guid } = req.params;
	// Extraemos el nombre del body
	const { name } = req.body;
	// Si no existe name devolvemos un 404 (not found)
	if (!name) return res.status(404);

	// Buscamos los detalles de la cuenta a traves del guid recibido por req.params
	const user = await userModel.findById(guid);

	// Si no existe el usuario respondemos con un 404 (not found)
	if (!user) return res.status(404).send("Cuenta no encontrada");

	// Añadimos el nombre modificado y enviamos la respuesta
	user.name = name;
	await user.save();

	return res.status(201).send("Usuario modificado");
};

const deleteUser = async (req, res) => {
	// Buscamos los detalles de la cuenta a traves del guid recibido por req.params
	const { guid } = req.params;
	const user = await userModel.findById(guid);
	// Si no existe el usuario respondemos con un 404 (not found)
	if (user === -1) return res.status(404).send("La cuenta no existe");

	// Eliminamos el usuario de la bbdd
	await user.deleteOne();

	// Enviamos simplemente un 200 OK
	res.status(200).send("Cuenta eliminada");
};

module.exports = {
	getUser,
	addUser,
	updateUser,
	deleteUser,
};

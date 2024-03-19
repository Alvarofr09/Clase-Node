// Importamos express
const express = require("express");
// Importamos dotenv
const dotenv = require("dotenv");

// Cargamos variables de entorno
dotenv.config();

// Importamos bbdd
const { USERS_BBDD } = require("./bbdd");

// Definimos el puerto
const port = process.env.PORT;
const app = express();

// middlewares para interpretar el formato JSON y text desde el cliente por http
app.use(express.json());
app.use(express.text());

// Obtener los detalles de una cuenta a partir del guid
app.get("/account/:guid", (req, res) => {
	// Buscamos los detalles de la cuenta a traves del guid recibido por req.params
	const { guid } = req.params;
	const user = USERS_BBDD.find((user) => user.guid === guid);
	// Si no existe el usuario respondemos con un 404 (not found)
	if (!user) return res.status(404).send("Cuenta no encontrada");

	res.send(user);
});

// Crear una nueva cuenta a partir del guid y de name
app.post("/account", (req, res) => {
	// Extremos el guid y el name del body. Obligamos que estén los dos campos para crear un usuario
	const { guid, name, mail } = req.body;
	// Si no existe guid o name devolvemos un 400 (bad request)
	if (!guid || !name || !mail) return res.status(400).send("Error en el body");

	// Buscamos los detalles de la cuenta a traves del guid recibido por req.params
	const user = USERS_BBDD.find((user) => user.guid === guid);
	// Si existe el usuario respondemos con un 409 (conflict)
	// Ya que no se puede crear una nueva cuenta con el mismo guid
	if (user) return res.status(409).send("Cuenta ya existente");

	// Creamos un objeto nuevo con los datos recibidos y lo añadimos al array de usuarios
	USERS_BBDD.push({ guid, name, mail });
	// Enviamos una respuesta 201 (created)
	res.sendStatus(201);
});

// Actualizar el nombre de una cuenta
app.patch("/account/:guid", (req, res) => {
	// Buscamos los detalles de la cuenta a traves del guid recibido por req.params
	const { guid } = req.params;
	// Extraemos el nombre del body
	const { name } = req.body;
	// Si no existe name devolvemos un 404 (not found)
	if (!name) return res.status(404);

	// Buscamos los detalles de la cuenta a traves del guid recibido por req.params
	const user = USERS_BBDD.find((user) => user.guid === guid);
	// Si no existe el usuario respondemos con un 404 (not found)
	if (!user) return res.status(404).send("Cuenta no encontrada");

	// Añadimos el nombre modificado y enviamos la respuesta
	user.name = name;
	res.send(user);
});

// Eliminar una cuenta
app.delete("/account/:guid", (req, res) => {
	// Buscamos los detalles de la cuenta a traves del guid recibido por req.params
	const { guid } = req.params;
	const userIndex = USERS_BBDD.findIndex((user) => user.guid === guid);
	// Si no existe el usuario respondemos con un 404 (not found)
	if (userIndex === -1) return res.status(404).send("La cuenta no existe");
	// Eliminamos el indice de ese usuario del array
	USERS_BBDD.splice(userIndex, 1);

	// Enviamos simplemente un 200 OK
	res.status(200).send("Cuenta eliminada");
});

// Levantamos el servidor en el puerto 3000
app.listen(port, () => {
	console.log(`Server levantado en el puerto ${port}`);
});

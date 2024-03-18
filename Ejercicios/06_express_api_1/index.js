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
	console.log(user);
	// Si no existe el usuario respondemos con un 404 (not found)
	if (!user) return res.status(404).send("Cuenta no encontrada");

	res.send(user);
});

// Crear una nueva cuenta a partir del guid y de name
app.post("/add-account", (req, res) => {
	res.send("Cuenta creada");
});

// Actualizar el nombre de una cuenta
app.patch("/update-account", (req, res) => {
	res.send("Cuenta actualizada");
});

// Eliminar una cuenta
app.delete("/delete-account", (req, res) => {
	res.send("Cuenta eliminada");
});

// Levantamos el servidor en el puerto 3000
app.listen(port, () => {
	console.log(`Server levantado en el puerto ${port}`);
});

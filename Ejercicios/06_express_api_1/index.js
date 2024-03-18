// Importamos express
const express = require("express");
// Importamos dotenv
const dotenv = require("dotenv");

// Cargamos variables de entorno
dotenv.config();

const { USERS_BBDD } = require("./bbdd");

// Definimos el puerto
const port = process.env.PORT;
const app = express();

// middlewares para interpretar el formato JSON y text desde el cliente por http
app.use(express.json());
app.use(express.text());

// Obtener los detalles de una cuenta
app.get("/account", (req, res) => {
	res.send("Detalles de la cuenta");
});

// Crear una nueva cuenta
app.post("/add-account", (req, res) => {
	res.send("Cuenta creada");
});

// Actualizar los detalles de una cuenta
app.put("/update-account", (req, res) => {
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

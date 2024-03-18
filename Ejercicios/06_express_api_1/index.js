// Importamos express
const express = require("express");

// Definimos el puerto
const PORT = 3000;
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
app.listen(PORT, () => {
	console.log(`Server in port ${PORT}`);
});

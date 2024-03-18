const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/saludo", (req, res) => {
	res.send("Hola");
});

app.listen(port, () => {
	console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Importamos express
const express = require("express");
// Importamos dotenv
const dotenv = require("dotenv");

// Cargamos variables de entorno
dotenv.config();

// Definimos el puerto
const port = process.env.PORT;
const app = express();

// middlewares para interpretar el formato JSON y text desde el cliente por http
app.use(express.json());
app.use(express.text());

// Levantamos el servidor en el puerto 3000
app.listen(port, () => {
	console.log(`Server levantado en el puerto ${port}`);
});

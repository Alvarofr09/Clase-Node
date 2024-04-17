// Importamos las librerias
const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

// Importamos las rutas
const accountRouter = require("./routes/accountRouter");
const authRouter = require("./routes/authRouter");
const authSessionRouter = require("./routes/authSessionRouter");
const authTokenRouter = require("./routes/authTokenRouter");

// Cargamos variables de entorno
dotenv.config();

// Cosas nuevas

// Definimos el puerto
const port = 3000;
const app = express();

// middlewares para interpretar el formato JSON y text desde el cliente por http
app.use(express.json());
app.use(express.text());
// middleware de peticiones HTTP para node.js (Morgan)
app.use(logger("dev"));
app.use(cookieParser());

// -- api middleware --
app.use("/account", accountRouter);
app.use("/auth", authRouter);
app.use("/auth-session", authSessionRouter);
app.use("/auth-token", authTokenRouter);

// Levantamos el servidor en el puerto 3000
app.listen(port, () => {
	console.log(`Server levantado en el puerto ${port}`);
});

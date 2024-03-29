// Importamos express
const express = require("express");
// Importamos dotenv
const dotenv = require("dotenv");
// Importamos Morgan (middleware de peticiones HTTP para node.js)
const logger = require("morgan");
// importamos cookie-parser
const cookieParser = require("cookie-parser");
// Importamos las rutas
const accountRouter = require("./routes/accountRouter");
const authRouter = require("./routes/authRouter");
const authSessionRouter = require("./routes/authSessionRouter");
const authTokenRouter = require("./routes/authTokenRouter");

// Cargamos variables de entorno
dotenv.config();

// Definimos el puerto
const port = process.env.PORT;
const app = express();

// middlewares para interpretar el formato JSON y text desde el cliente por http
app.use(express.json());
app.use(express.text());
// middleware de peticiones HTTP para node.js (Morgan)
app.use(logger("dev"));
app.use(cookieParser());

// middleware que hemos importado del router accountRouter
app.use("/account", accountRouter);
// middleware que hemos importado del router authRouter
app.use("/auth", authRouter);
// middleware que hemos importado del router authSessionRouter
app.use("/auth-session", authSessionRouter);
// middleware que hemos importado del router authTokenRouter
app.use("/auth-token", authTokenRouter);

// Levantamos el servidor en el puerto 3000
app.listen(port, () => {
	console.log(`Server levantado en el puerto ${port}`);
});

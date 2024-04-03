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
const mongodbConnection = require("./services/mongodb");

// Cargamos variables de entorno
dotenv.config();

// Definimos el puerto
const PORT = process.env.PORT;
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

// Conectamos con la base de datos y el servidor
const main = async () => {
	try {
		await mongodbConnection();
		console.log("Database connected");
		app.listen(PORT, () => {
			console.log(`Server levantado en el puerto ${PORT}`);
		});
	} catch (e) {
		console.log("Error in database connection:", e.message);
	}
};

// Lanzamos el servidor
main();

const express = require("express");
const fileUpload = require("express-fileupload");
const dontenv = require("dotenv");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");

dontenv.config();

const app = express();
const PORT = process.env.PORT;

// Instanciamos la libreria express-fileupload (para subir archivos)
app.use(
	fileUpload({
		createParentPath: true, // Crea la carpeta donde almacenamos las imagenes si no ha sido creada
		limits: { fieldSize: 20 * 1024 * 1024 }, // Limitamos el tamaño de la imagen a 20mb
		abortOnLimit: true, // Interrumpimos la subida de la imagen si excede el limite
		responseOnLimit: "Imagen demasiado grande", // Enviaremos un mensaje de respuesta cuando se interrumpe la carga
		uploadTimeout: 0, // Indicamos el tiempo de respuesta si se interrumpe la carga de la imagen
	})
);

// middlewares
app.use(express.json());
app.use(express.text());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// PETICIONES A NUESTRA API
app.use("/users", userRouter);
app.use("/products", productRouter);

// Servidor
app.listen(PORT, () => {
	console.log(`Server levantado en el puerto ${PORT}`);
});

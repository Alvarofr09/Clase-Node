const express = require("express");
const dontenv = require("dotenv");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");

dontenv.config();

const app = express();
const PORT = process.env.PORT;

// middlewares
app.use(express.json());
app.use(express.text());
app.use(logger("dev"));
app.use(cookieParser());

// PETICIONES A NUESTRA API
app.use("/users", userRouter);
app.use("/products", productRouter);

// Servidor
app.listen(PORT, () => {
	console.log(`Server levantado en el puerto ${PORT}`);
});

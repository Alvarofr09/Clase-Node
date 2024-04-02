// importamos express
const express = require("express");

// Importamos los controladores
const {
	getUser,
	addUser,
	updateUser,
	deleteUser,
} = require("../controllers/accountCrontroller.js");

// Creamos un router
const accountRouter = express.Router();

// Middleware. Se ejecutara siempre antes del endpoint al que se llama
accountRouter.use((req, res, next) => {
	// Aqui le pasaremos la funcion que vamos a hacer
	console.log(
		"Se ejecuta nuestra funcion definida en el middleware de account"
	);
	// Continuamos con la siguiente funcion
	next();
});

// Obtener los detalles de una cuenta a partir del guid
accountRouter.get("/:guid", getUser);

// Crear una nueva cuenta a partir del guid y de name
accountRouter.post("/", addUser);

// Actualizar el nombre de una cuenta
accountRouter.patch("/:guid", updateUser);

// Eliminar una cuenta
accountRouter.delete("/:guid", deleteUser);

// Exportamos el archivo accountRouter.js
module.exports = accountRouter;

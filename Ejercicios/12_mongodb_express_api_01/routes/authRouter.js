// importamos express
const express = require("express");

// Importamos los controladores
const {
	getPublic,
	login,
	loginAutorizado,
} = require("../controllers/authController.js");

const authRouter = express.Router();

// Endpoint público (no autenticado y no autorizado)
authRouter.get("/public", getPublic);

// Endpoint autenticado para todo usuario registrado
authRouter.post("/autenticado", login);

// Endpoint autorizado a administradores
authRouter.post("/autorizado", loginAutorizado);

module.exports = authRouter;

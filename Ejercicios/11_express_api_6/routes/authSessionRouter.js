// Importamos express
const express = require("express");

// Importamos los controladores
const { login, getProfile } = require("../controllers/authSessionController");

const authSessionRouter = express.Router();

authSessionRouter.post("/login", login);

authSessionRouter.get("/profile", getProfile);

module.exports = authSessionRouter;

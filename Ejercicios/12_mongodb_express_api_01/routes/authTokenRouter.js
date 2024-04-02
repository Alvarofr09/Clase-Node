const express = require("express");

const validateLoginDto = require("../dto/validateLoginDto");
const {
	loginToken,
	getProfileToken,
} = require("../controllers/authTokenController");

const authTokenRouter = express.Router();

authTokenRouter.post("/login", validateLoginDto, loginToken);

authTokenRouter.get("/profile", getProfileToken);

module.exports = authTokenRouter;

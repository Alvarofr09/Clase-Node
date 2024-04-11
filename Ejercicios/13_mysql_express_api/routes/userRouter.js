const express = require("express");
const {
	addUser,
	loginUser,
	deleteUser,
	updateUser,
	getProfileUser,
} = require("../controllers/userController");

const userRouter = express.Router();

/*----------- Endpoints de GET -----------*/
userRouter.get("/:id", getProfileUser);

/*----------- Endpoints de POST -----------*/
userRouter.post("/", addUser);
userRouter.post("/login", loginUser);

/*----------- Endpoints de DELETE -----------*/
userRouter.delete("/:id", deleteUser);

/*----------- Endpoints de PATCH -----------*/
userRouter.patch("/:id", updateUser);

module.exports = userRouter;

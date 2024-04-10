const express = require("express");
const {
	addUser,
	loginUser,
	deleteUser,
	updateUser,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/", addUser);
userRouter.post("/login", loginUser);

userRouter.delete("/:id", deleteUser);

userRouter.patch("/:id", updateUser);

module.exports = userRouter;

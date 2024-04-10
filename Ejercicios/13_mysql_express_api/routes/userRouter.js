const express = require("express");
const {
	addUser,
	loginUser,
	deleteUser,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/", addUser);
userRouter.post("/login", loginUser);

userRouter.delete("/:id", deleteUser);

module.exports = userRouter;

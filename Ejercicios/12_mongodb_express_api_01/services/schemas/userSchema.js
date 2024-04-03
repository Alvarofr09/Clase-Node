const mongoose = require("mongoose");

mongoose.Schema({
	_id: String,
	name: String,
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: String,
});

const userModel = mongoose.model("User", userSchema);

module.exports = userSchema;

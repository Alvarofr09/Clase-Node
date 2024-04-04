const { USERS_BBDD } = require("../bbdd.js");
const userModel = require("../services/schemas/userSchema.js");

const checkEmailPassword = async (email, password) => {
	// Buscamos el email entre las cuentas
	// const user = USERS_BBDD.find((user) => user.email === email);
	const user = await userModel.findOne({ email });

	// Si no existe el usuario lanzamos un error
	if (!user) throw new Error();

	// Si el password no coincide lanzamos un error
	if (user.password !== password) throw new Error();

	// Si todo es correcto devolvemos el usuario
	return user;
};

module.exports = checkEmailPassword;

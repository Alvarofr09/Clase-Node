const moment = require("moment");
const md5 = require("md5");

const db = require("../db");

const userDao = {};

userDao.getUserByEmail = async (email) => {
	let conn = null;
	try {
		conn = await db.createConection();
		return await db.query(
			"SELECT * FROM users WHERE email = ?",
			email,
			"select",
			conn
		);
	} catch (e) {
		throw new Error(e);
	} finally {
		conn && (await conn.end());
	}
};

userDao.addUser = async (userData) => {
	// Conectamos con la base de datos y añadimos el usuario
	let conn = null;
	try {
		conn = await db.createConection();
		// Creamos un objeto con los datos del usuario a guardar en la base de datos
		// Encriptamos la password con md5 y usamos la libreria momentjs para registrar la fecha actual
		let userObj = {
			name: userData.name,
			surname: userData.surname,
			email: userData.email,
			password: md5(userData.password),
			registerDate: moment().format("YYYY-MM-DD HH:mm:ss"),
		};
		return await db.query("INSERT INTO users SET ?", userObj, "insert", conn);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

module.exports = userDao;

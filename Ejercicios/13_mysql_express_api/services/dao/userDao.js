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

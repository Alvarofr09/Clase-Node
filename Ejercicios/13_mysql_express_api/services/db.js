const mysql = require("mysql2/promise");

let db = {};

db.createConection = async () => {
	try {
		const mysqlConecction = await mysql.createConnection({
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			// dateStrings:
			// se indica a la libreria que debe devolver los valores de tipo fecha y hora
			// como cadenas de texto ('2024-02-10 15:30:00) en lugar de objetos Date
			dateStrings: true,
		});
		console.log("Database connected, TRUE");
		return mysqlConecction;
	} catch (error) {
		throw new Error(error.message);
	}
};

db.query = async (sqlQuery, params, type, conn) => {
	try {
		const [result] = await conn.query(sqlQuery, params);
		switch (type) {
			case "select":
				return JSON.parse(JSON.stringify(result));

			case "insert":
				return parseInt(result.insertId);

			case "update":
			case "replace":
			case "delete":
				if (result.affectedRows > 0) {
					return true;
				} else {
					return false;
				}

			default:
				throw new Error("Query type not found");
		}
	} catch (error) {
		console.error("Query or database error: ", error);
		throw new Error(error.message);
	}
};
module.exports = db;

const db = require("../db");

const productDao = {};

productDao.getAllProducts = async () => {
	let conn = null;
	try {
		conn = await db.createConection();
		return await db.query("SELECT * FROM products", null, "select", conn);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

productDao.getProductById = async (id) => {
	let conn = null;
	try {
		conn = await db.createConection();
		return await db.query(
			"SELECT * FROM products WHERE id = ?",
			id,
			"select",
			conn
		);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

productDao.addProducts = async (productData) => {
	let conn = null;
	try {
		conn = await db.createConection();
		return await db.query(
			"INSERT INTO products SET ?",
			productData,
			"insert",
			conn
		);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

module.exports = productDao;

const db = require("../db");
const moment = require("moment");

const orderDao = {};

orderDao.addOrder = async (orderData) => {
	let conn = null;
	try {
		conn = await db.createConection();

		let orderObj = {
			idProduct: orderData.idProduct,
			quantity: orderData.quantity,
			idUser: orderData.idUser,
			orderDate: moment().format("YYYY-MM-DD HH:mm:ss"),
		};

		return await db.query("INSERT INTO orders SET ?", orderObj, "insert", conn);
	} catch (e) {
		console.log(e.message);
		throw new Error(e);
	} finally {
		conn && (await conn.end());
	}
};

orderDao.addProductOrders = async (rProdOrdData) => {
	let conn = null;

	let rProdOrdObj = {
		idProduct: rProdOrdData.idProduct,
		idOrder: rProdOrdData.idOrder,
	};

	try {
		conn = await db.createConection();
		return await db.query(
			"INSERT INTO r_products_orders SET ?",
			rProdOrdObj,
			"insert",
			conn
		);
	} catch (e) {
		console.log(e.message);
		throw new Error(e);
	} finally {
		conn && (await conn.end());
	}
};

orderDao.updateProductStock = async (stock, idProduct) => {
	let conn = null;
	try {
		conn = await db.createConection();

		return await db.query(
			"UPDATE products SET stock = ? WHERE id = ?",
			[stock, idProduct],
			"update",
			conn
		);
	} catch (error) {
		console.log(error.message);
		throw new Error(error.message);
	} finally {
		conn && (await conn.end());
	}
};

orderDao.getProduct = async (idProduct) => {
	let conn = null;
	try {
		conn = await db.createConection();
		return await db.query(
			"SELECT * FROM products WHERE id = ?",
			idProduct,
			"select",
			conn
		);
	} catch (error) {
		console.log(error.message);
		throw new Error(error.message);
	} finally {
		conn && (await conn.end());
	}
};
module.exports = orderDao;

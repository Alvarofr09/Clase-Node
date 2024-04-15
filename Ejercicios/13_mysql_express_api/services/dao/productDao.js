const { removeUndefinedKeys } = require("../../utils/removeUndefinedKeys");
const moment = require("moment");
const db = require("../db");

const productDao = {};

productDao.getProductByReference = async (reference) => {
	let conn = null;
	try {
		conn = await db.createConection();
		return await db.query(
			"SELECT * FROM products WHERE reference = ?",
			reference,
			"select",
			conn
		);
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

productDao.addProduct = async (productData) => {
	let conn = null;
	try {
		conn = await db.createConection();
		// Creamos un objeto con los datos del producto a guardar en la bbdd
		// Usamos la libreria momentjs para registrar la fecha actual
		let productObj = {
			name: productData.name,
			description: productData.description,
			reference: productData.reference,
			stock: productData.stock,
			price: productData.price,
			registerDate: moment().format("YYYY-MM-DD HH:mm:ss"),
		};

		// Eliminamos los campos que no se van a registrar
		productObj = await removeUndefinedKeys(productObj);

		// Insertamos el nuevo producto
		return await db.query(
			"INSERT INTO products SET ?",
			productObj,
			"insert",
			conn
		);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

productDao.addProductFile = async (fileData) => {
	// Conectamos con la bbdd y añadimos la imagen
	let conn = null;
	try {
		conn = await db.createConection();
		// Creamos un objeto con los datos del fichero a guardar en la bbdd
		let fileObj = {
			name: fileData.name,
			path: fileData.path,
			productId: fileData.productId,
			registerDate: moment().format("YYYY-MM-DD HH:mm:ss"),
		};

		// Instertamos el registro
		return await db.query("INSERT INTO images SET ?", fileObj, "insert", conn);
	} catch (error) {
		console.log(error.mesagge);
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

module.exports = productDao;

const dao = require("../services/dao/productDao");

const getAllProducts = async (req, res) => {
	try {
		const products = await dao.getAllProducts();
		res.send(products);
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

const getProductById = async (req, res) => {
	const { id } = req.params;

	if (!id) return res.status(400).send("Error en la url");
	try {
		const product = await dao.getProductById(id);

		if (product.length <= 0)
			return res.status(404).send("No se encontro el producto solicitado");
		res.send(product);
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
	res.send("Aqui mostraria el producto solicitado");
};

const addProduct = async (req, res) => {
	const { name, category } = req.body;

	if (!name || !category) return res.status(400).send("Error en el body");

	try {
		const product = {
			name,
			category,
		};

		const productId = await dao.addProducts(product);
		if (productId)
			return res.send(`Producto con el id: ${productId}, registrado`);
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

module.exports = {
	getAllProducts,
	getProductById,
	addProduct,
};

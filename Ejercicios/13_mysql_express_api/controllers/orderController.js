const orderDao = require("../services/dao/orderDao");
const { verifyToken } = require("../utils/verifyToken");

const addOrder = async (req, res) => {
	try {
		// Verificamos el token
		const payload = await verifyToken(req);

		if (!payload) return res.sendStatus(401);

		// Contruir un objeto con los datos del pedido
		const orderData = {
			idProduct: req.body.idProduct,
			quantity: req.body.quantity,
			idUser: payload.id,
		};

		// Insertamos el pedido en la tabla orders
		const idOrder = await orderDao.addOrder(orderData);

		if (!idOrder)
			return res.status(500).send(`No se ha podido insertar la orden`);

		// insertamos el pedido en la tabla r_products_orders
		const rProdOrdData = {
			idProduct: req.body.idProduct,
			idOrder,
		};
		const rProdOrdId = await orderDao.addProductOrders(rProdOrdData);
		if (!rProdOrdId)
			return res.status(500).send(`No se ha podido insertar la relacio`);

		// Actualizar el stock
		const product = await orderDao.getProduct(req.body.idProduct);
		if (product.length === 0)
			return res.status(404).send("Producto no encontrado");

		// [{name: '...', price: "...", stock: '...'}]
		const productStock = product[0].stock;

		const newStock = productStock - req.body.quantity;
		const updateProduct = await orderDao.updateProductStock(
			newStock,
			req.body.idProduct
		);

		if (!updateProduct)
			return res.status(500).send("No se ha podido actualizar el stock");

		return res
			.status(201)
			.send(
				`Orden insertada con id ${idOrder} y en la relacion con id ${rProdOrdId}`
			);
	} catch (error) {
		console.log(error.message);
		throw new Error(error.mesagge);
	}
};

module.exports = { addOrder };

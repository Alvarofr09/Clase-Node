const dao = require("../services/dao/productDao");
const path = require("path");

// const getAllProducts = async (req, res) => {
// 	try {
// 		const products = await dao.getAllProducts();
// 		res.send(products);
// 	} catch (error) {
// 		console.log(error);
// 		throw new Error(error);
// 	}
// };

// const getProductById = async (req, res) => {
// 	const { id } = req.params;

// 	if (!id) return res.status(400).send("Error en la url");
// 	try {
// 		const product = await dao.getProductById(id);

// 		if (product.length <= 0)
// 			return res.status(404).send("No se encontro el producto solicitado");
// 		res.send(product);
// 	} catch (error) {
// 		console.log(error);
// 		throw new Error(error);
// 	}
// };

const addProduct = async (req, res) => {
	// Verificamos que el body no este vacío
	if (Object.keys(req.body).length === 0)
		return res.status(400).send("Error al recibir el body");

	try {
		// Buscamos el producto por la referencia
		const product = await dao.getProductByReference(req.body.reference);
		if (product.length > 0)
			return res.status(409).send("El producto ya existe");

		// Añadimos el nuevo producto
		const productId = await dao.addProduct(req.body);

		// Obtenemos las imagenes, las subimos al servidor y añadimos los datos de la
		// imagen y el producto asociado a la bbdd

		// Controlamos si nos vienen algun tipo de archivo en el objeto files
		if (req.files || Object.keys(req.files).length > 0) {
			// 1 archivo [{}], > 1 archivo [[{}, {},....]]
			// Obtenemos un array de objeos con todas las imagenes
			const images = !req.files.imagen.length
				? [req.files.imagen]
				: req.files.imagen;

			// Recorremos el array para procesar cada imagen
			for (const image of images) {
				// Ya podemos acceder a las propiedades del objeto image
				// Obtenemos el path de la imagen
				let uploadPath = path.join(
					__dirname,
					"../public/product/" + image.name
				);
				// Usamos el metodo mv para ubicar el archivo en nuestro servidor
				image.mv(uploadPath, (err) => {
					if (err) return res.status(500).send(err.mesagge);
				});
				await dao.addProductFile({
					name: image.name,
					path: uploadPath,
					productId: productId,
				});
			}
			return res.send(`Producto ${req.body.name} con id ${productId} añadido`);
		}
	} catch (error) {
		console.log(error.mesagge);
		throw new Error(error.mesagge);
	}
};

module.exports = {
	// getAllProducts,
	// getProductById,
	addProduct,
};

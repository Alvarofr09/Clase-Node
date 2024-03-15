const net = require("node:net");

function findAvailablePort(desiredPort) {
	return new Promise((resolve, reject) => {
		const server = net.createServer();

		server.listen(desiredPort, () => {
			// Recuperamos el puerto en caso de que este disponible
			const { port } = server.address();

			// Cerramos el servidor y resolvemos la promisa con el puerto
			server.close(() => {
				resolve(port);
			});
		});

		// en caso de que el puerto no este disponible, llamamos a la funcion de búsqueda de puerto disponible de forma recursiva
		server.on("error", (err) => {
			if (err.code === "EADDRINUSE") {
				findAvailablePort(0).then((port) => {
					resolve(port);
				});
			} else {
				reject(err);
			}
		});
	});
}

module.exports = {
	findAvailablePort,
};

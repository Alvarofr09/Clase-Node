const http = require("node:http");
const { findAvailablePort } = require("./3.free-port.js");

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/plain");
	res.end("Primer servidor con Node.js");
});

findAvailablePort(3000).then((port) => {
	server.listen(port, () => {
		console.log(`Servidor corriendo en http://localhost:${port}`);
	});
});

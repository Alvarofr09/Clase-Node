const http = require("node:http");

const host = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/plain");
	res.end("Primer servidor con Node.js");
});

server.listen(port, host, () => {
	console.log(`Servidor corriendo en http://${host}:${port}`);
});

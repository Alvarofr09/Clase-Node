// fs.readFile -> Asíncrono
const fs = require("node:fs");

console.log("leyendo el primer archivo...");
fs.readFile("./archivo.txt", "utf-8", (err, data) => {
	if (err) throw err;
	console.log("primer archivo:", data);
});

console.log(".....haciendo cosas mientras leemos el archivo...");

console.log("leyendo el segundo archivo...");
fs.readFile("./archivo2.txt", "utf-8", (err, data) => {
	if (err) throw err;
	console.log("segundo archivo:", data);
});

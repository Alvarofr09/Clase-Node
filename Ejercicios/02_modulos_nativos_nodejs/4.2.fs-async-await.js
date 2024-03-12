const { readFile } = require("node:fs/promises");

(async () => {
	console.log("leyendo el primer archivo...");
	const text = await readFile("./archivo.txt", "utf-8");
	console.log("primer archivo:", text);

	console.log(".....haciendo cosas mientras leemos el archivo...");

	console.log("leyendo el segundo archivo...");
	const text2 = await readFile("./archivo2.txt", "utf-8");
	console.log("segundo archivo:", text2);
})();

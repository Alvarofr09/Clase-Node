const fs = require("node:fs/promises");
const path = require("node:path");
const pc = require("picocolors");

// Extraemos el segundo argumento de process.argv (el directorio). Utilizamos el operador nullish coalescing para evitar un error de undefined,
// que si se cumple se asigna el punto como directorio.
const folder = process.argv[2] ?? ".";

async function ls(folder) {
	let files;
	try {
		files = await fs.readdir(folder);
	} catch (err) {
		console.error(`error al leer el directorio ${folder}`);
		process.exit(1);
	}

	const filesPromises = files.map(async (file) => {
		const filePath = path.join(folder, file);
		let stats;
		try {
			stats = await fs.stat(filePath); // información del archivo
		} catch (err) {
			console.error(pc.red`❌ error al leer el archivo ${filePath}`, err);
			process.exit(1);
		}

		const isDirectory = stats.isDirectory();
		const fileType = isDirectory ? "d" : "f";
		const fileSize = stats.size.toString();
		const fileModified = stats.mtime.toLocaleString();

		return `${pc.magenta(fileType)} ${pc.cyan(file.padEnd(20))}  ${pc.green(
			fileSize.padStart(10)
		)} ${pc.yellow(fileModified)}`;
	});

	const filesInfo = await Promise.all(filesPromises);

	filesInfo.forEach((file) => console.log(file));
}

ls(folder);
// node 7.ls-advance.js ../01_modulos_nodejs

const path = require('node:path')

// barra separadora de directorios segun el sistema operativo
console.log(path.sep)

// unir las rutas con path.join()
const filePath = path.join('content', 'subfolder', 'archivo.txt')
console.log(filePath)

const base = path.basename('tmp/migue/secret/password.txt', '.txt')
console.log(base)

const extension = path.extname('image.jpg')
console.log(extension)

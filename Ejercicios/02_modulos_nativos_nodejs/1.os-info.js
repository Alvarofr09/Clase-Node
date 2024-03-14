const os = require('node:os')

console.log('Sistema operativo:', os.platform())
console.log('Version del sistema operativo:', os.release())
console.log('Arquitectura del sistema operativo:', os.arch())
console.log('Memoria total:', os.totalmem() / 1024 / 1024)
console.log('Memoria libre:', os.freemem() / 1024 / 1024)
console.log('Numero de procesadores:', os.cpus())
console.log('uptime:', os.uptime() / 60 / 60)

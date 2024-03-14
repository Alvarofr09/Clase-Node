// fs.readFileAsync -> Síncrono
const fs = require('node:fs')

console.log('leyendo el primer archivo...')
const text = fs.readFileSync('./archivo.txt', 'utf-8')
console.log('primer archivo:', text)

console.log('.....haciendo cosas mientras leemos el archivo...')

console.log('leyendo el segundo archivo...')
const text2 = fs.readFileSync('./archivo2.txt', 'utf-8')
console.log('segundo archivo:', text2)

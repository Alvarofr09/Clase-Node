// process module to interact with the operating system
// argumentos de entrada
console.log(process.argv);


// controlar el proceso y su salida
// process.exit(0);


// controlar eventos del proceso
process.on('exit', () => {

 // console.log('Hola');
})

// current working directory
console.log(process.cwd())


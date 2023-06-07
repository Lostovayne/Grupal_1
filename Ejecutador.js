const child_process = require('child_process')

const ArgumentosRecibidos = process.argv.splice(2)
const argumento1 = ArgumentosRecibidos[0]
const argumento2 = ArgumentosRecibidos[1]
const TipoDeMoneda = ArgumentosRecibidos[2]
const CantidadDinero = ArgumentosRecibidos[3]

function Ejecutar(archivo, argumento1, argumento2, TipoDeMoneda, CantidadDinero) {
  return new Promise((resolve, reject) => {
    child_process.exec(
      `node ${archivo} ${argumento1} ${argumento2} ${TipoDeMoneda} ${CantidadDinero}`,
      function (error, result) {
        if (error) {
          reject(error)
        } else {
          console.log(result)
          resolve(result)
        }
      }
    )
  })
}

// Ejecutar la función MostrarDatos que está dentro de index.js
Ejecutar('index.js', argumento1, argumento2, TipoDeMoneda, CantidadDinero).catch((error) =>
  console.error('Ocurrió un error al ejecutar el archivo:', error)
)

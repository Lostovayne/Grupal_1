const fs = require('fs')
const https = require('https')

const ArgumentosRecibidos = process.argv.splice(2)
const argumento1 = ArgumentosRecibidos[0]
const argumento2 = ArgumentosRecibidos[1]
const TipoDeMoneda = ArgumentosRecibidos[2]
const CantidadDinero = ArgumentosRecibidos[3]
const date = new Date()
const fecha = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()

function MostrarDatos(argumento1, argumento2, TipoDeMoneda, CantidadDinero) {
  return new Promise((resolve, reject) => {
    const url = `https://mindicador.cl/api/${TipoDeMoneda.toLowerCase()}/${fecha}`

    https.get(url, (resp) => {
      let datos = ''
      resp.on('data', (d) => {
        datos += d
      })
      resp.on('end', () => {
        const { serie } = JSON.parse(datos)
        const valorDinero = serie[0].valor
        let resultado = CantidadDinero / valorDinero
        resultado = resultado.toFixed(2)
        let FormatoRespuesta = `A la fecha:${date}
                      Fue realizada cotización con los siguientes datos:
                      Cantidad de pesos a convertir: ${CantidadDinero} pesos
                      Convertido a "${TipoDeMoneda}" da un total de:
                      $${resultado}`

        fs.writeFile(argumento1 + '.' + argumento2, FormatoRespuesta, () => resolve())
      })
      resp.on('error', (e) => {
        reject(e)
      })
    })
  })
}

function LeerDatos(argumento1, argumento2) {
  return new Promise((resolve, reject) => {
    fs.readFile(argumento1 + '.' + argumento2, 'utf-8', (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

//Ejecucion de las funciones

MostrarDatos(argumento1, argumento2, TipoDeMoneda, CantidadDinero)
  .then(() => LeerDatos(argumento1, argumento2))
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.error('Ocurrió un error:', error)
  })

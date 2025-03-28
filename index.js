import readline from "readline"
import fs from "fs"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

function hacerPregunta(pregunta) {
    return new Promise(resolve => {
        rl.question(pregunta, (respuesta) => {
            resolve(respuesta);
        })
    })
}

async function preguntar() {
    const producto = await hacerPregunta("Producto: ");
    const precio = await hacerPregunta("Precio: ");
    const cantidad = await hacerPregunta("Cantidad: ");
    var nombreArchivo = await hacerPregunta("Nombre Archivo: ");

    if (nombreArchivo === null || nombreArchivo === undefined || nombreArchivo === "") {
        nombreArchivo = "productos"
    }

    const productos = {
        producto,
        precio,
        cantidad
    }

    try {
        if (fs.existsSync(`${nombreArchivo}.json`)) {
            const data = fs.readFileSync(`${nombreArchivo}.json`, "utf8")
            const productos = JSON.parse(data)
            productos.push({"producto": producto, "precio": precio, "cantidad": cantidad})
            fs.writeFileSync(`${nombreArchivo}.json`, JSON.stringify(productos, null, 2), 'utf8')
        } else {
            const productos = [{"producto": producto, "precio": precio, "cantidad": cantidad}]
            fs.writeFileSync(`${nombreArchivo}.json`, JSON.stringify(productos, null, 2), 'utf8')
        }

    } catch (error) {   
        throw error
    }

    try {
        const contenidoArchivo = fs.readFileSync(`${nombreArchivo}.json`, "utf8")
        console.log(contenidoArchivo)
    } catch (error) {
        throw error
    }
    
    rl.close()
}

await preguntar();
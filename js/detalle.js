let codigo = location.search;
let codigoProducto = new URLSearchParams(codigo);
let codigoSeleccionado = codigoProducto.get('codigo');
let codigoFinal = document.getElementById('codigo');
let nombre = document.getElementById('nombre');
let imagen = document.getElementById('imagen');
let guitarras = localStorage.getItem("productos")
guitarras = JSON.parse(guitarras)
const producto = guitarras.find((producto, index) => index == codigoSeleccionado)

const generar = (etiqueta, propiedades) => {
    const elemento = document.createElement(etiqueta)
    Object.keys(propiedades).forEach(propiedad => elemento[propiedad] = propiedades[propiedad])
    return elemento
}

const templateDetalle = ({
    imagen,
    nombre,
    precio,
    index
}) => {
    const producto = generar("article", {
        className: "producto mx-auto col-12 col-md-6 col-lg-4"
    })
    producto.setAttribute("data-id", index)
    const contenedor = generar("div", {
        className: "d-flex flex-wrap",
    })
    imagen.forEach(img => contenedor.appendChild(generar("img", {
        src: `../img/guitarraMejores/${img}`,
        alt: `Imagen del Producto ${nombre}`,
        className: "col-12 col-md-6 col-lg-4 p-2 w-50 rounded-5"
    })))
    const name = generar("h2", {
        innerHTML: `Producto: ${nombre}`,
        className: "text-center text-white"
    })
    const price = generar("h2", {
        innerHTML: `Precio: ${precio}`,
        className: "text-center text-white"
    })
    producto.append(contenedor, name, price)
    return producto
}

document.getElementById("producto").appendChild(templateDetalle({
    ...producto,
    codigoSeleccionado
}))



let botonRegresar = document.getElementById('botonRegresar');
botonRegresar.addEventListener('click', e => {
    e.preventDefault()
    location.assign('index.html')
})
let productosHTML = document.querySelector('#productos');
fetch("./datos/productos.json")
    .then((respuesta) => respuesta.json())
    .then((guitarras) => {
        localStorage.setItem("productos", JSON.stringify(guitarras, null, 2))
        guitarras.forEach((producto, index) => productosHTML.appendChild(templateProducto({
            ...producto,
            index
        })))
    })
    .catch((error) => console.log('Ha surgido un error ' + error))

const generar = (etiqueta, propiedades) => {
    const elemento = document.createElement(etiqueta)
    Object.keys(propiedades).forEach(propiedad => elemento[propiedad] = propiedades[propiedad])
    return elemento
}

const verDetalle = index => location.assign(`/detalle.html?codigo=${index}`)

const templateProducto = ({
    imagen,
    nombre,
    precio,
    index
}) => {
    const producto = generar("article", {
        className: "producto col-12 col-md-6 col-lg-4 p-2"
    })
    producto.setAttribute("data-id", index)
    const img = generar("img", {
        src: `../img/guitarraMejores/${imagen[0]}`,
        alt: `Imagen del Producto ${nombre}`,
        className: "w-100"
    })
    const name = generar("h2", {
        innerHTML: `${nombre}`,
        className: "text-center text-white"
    })
    const price = generar("h2", {
        innerHTML: ``,
        className: "text-center text-white"
    })
    const link = generar("a", {
        innerHTML: `Ver Detalle`,
        className: "btn btn-outline-primary d-block text-white"
    })
    link.addEventListener("click", (e) => {
        e.preventDefault();
        verDetalle(index)
    })
    producto.append(img, name, price, link)
    return producto
}
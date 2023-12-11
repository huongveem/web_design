/**Varriables Navegación */
const hamburger = document.querySelector('#hamburger');

/**Variables Galeria */
const images = document.querySelector('.galeria');

/**Variables Carrito */
const carrito = document.querySelector('.carrito');
const contenedorProductos = document.querySelector('.carrito tbody');
const listaProductos = document.querySelector('.contenedor-productos');
const vaciarCarritoBtn = document.querySelector('.vaciar-carrito');

let productos = [];

/**Event Listeners */
eventListeners();
function eventListeners() {
    /**Mostrar u ocultar la navegacion */
    hamburger.addEventListener('click', mostrarNavegacion);

    /**Mostrar Imagen Galeria en el centro de la pantalla */
    if (images) {
        images.addEventListener('click', ampliarImagen);
    }

    /**Obtener el producto seleccionado */
    if(listaProductos){
        listaProductos.addEventListener('click', obtenerProducto);

        /**Borrar un producto especifico del carrito */
        carrito.addEventListener('click', borrarProducto);
    
        /**Borrar todos los elementos del carrito */
        vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    
        /**Carga los elementos almacenados en localStorage */
        document.addEventListener('DOMContentLoaded', () => {
            productos = JSON.parse(localStorage.getItem('carrito')) || [];
            crearHTML();
        });
    }    

}

/**Funcion mostrar u ocultar navegacion */
function mostrarNavegacion() {
    const navegacion = document.querySelector('.navegacion-principal');

    navegacion.classList.toggle('mostrar');
}
/**Mostrar u ocultar una imagen de una galería */
function ampliarImagen(e) {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    const img = document.createElement('img');
    img.src = e.target.src;
    img.classList.add('overlay-img');

    const btnCerrar = document.createElement('button');
    btnCerrar.textContent = 'X';
    btnCerrar.classList.add('btn-cerrar');


    btnCerrar.addEventListener('click', () => {
        overlay.remove();
        document.body.classList.remove('fijar-body');
    })
    overlay.addEventListener('click', () => {
        overlay.remove();
        document.body.classList.remove('fijar-body');
    });

    overlay.appendChild(img);
    overlay.appendChild(btnCerrar);
    document.body.appendChild(overlay);
    document.body.classList.add('fijar-body');
}

/**Funcion agregar productos al carrito */
function obtenerProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        sincronizarProducto(e.target.parentElement.parentElement);
    }
}
function sincronizarProducto(producto) {
    const productoObj = {
        id: producto.querySelector('a').getAttribute('data-id'),
        nombre: producto.querySelector('.producto-nombre').textContent,
        contenido: producto.querySelector('.producto-texto').textContent,
        precio: producto.querySelector('.precio').textContent,
        imagen: producto.querySelector('.producto-img').src,
        cantidad: 1
    };

    const existe = productos.some(producto => producto.id === productoObj.id);

    if (existe) {
        const nuevoProductos = productos.map(producto => {
            if (producto.id === productoObj.id) {
                producto.cantidad++;
                return producto;
            } else {
                return producto;
            }
        });
        productos = nuevoProductos;
    } else {
        productos = [...productos, productoObj];
    }

    if (productos.length) {
        crearHTML();
    }
}

/**Crear HMTL */
function crearHTML() {

    limpiarHTML();

    productos.forEach(producto => {
        const tableRow = document.createElement('tr');
        const { id, nombre, contenido, precio, imagen, cantidad } = producto;
        tableRow.innerHTML = `
            <td>${nombre}</td>
            <td><img src="${imagen}" width="300"></td></td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a class="borrar-producto" data-id="${id}" href="#">X</a></td>
        `;
        contenedorProductos.appendChild(tableRow);
    });
    localStorage.setItem("carrito",JSON.stringify(productos));
}

/**Limpiar HTML */
function limpiarHTML() {
    while (contenedorProductos.firstChild) {
        contenedorProductos.removeChild(contenedorProductos.firstChild);
    }
}
/**Eliminar un producti específico */
function borrarProducto(e) {
    if (e.target.classList.contains('borrar-producto')) {
        const id = e.target.getAttribute('data-id');
        productos = productos.filter(producto => producto.id !== id);
        crearHTML();        
    }
}
/**Vaciar todo el carrito */
function vaciarCarrito() {
    productos = [];
    localStorage.removeItem("carrito");
    limpiarHTML();
}

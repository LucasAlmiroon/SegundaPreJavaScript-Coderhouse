class Producto {

    constructor(id, tipo, marca, precio, descripcion, stock, img) {
        this.id = id;
        this.tipo = tipo;
        this.marca = marca
        this.precio = precio;
        this.descripcion = descripcion;
        this.stock = stock;
        this.img = img
    }

    descontarStock() {
        this.stock--
    }

}

let carrito = [];

const productos = [];
const peticion = async () => {
    const respuesta = await fetch("json/productos.json")
    const datos = await respuesta.json()
    datos.forEach(producto => {
        productos.push(producto);
    });

    const productosPorDiv = 3; // Número de productos por cada div nuevo
    cuerpo.removeChild(mensajeCarga);
    // Iterar a través de los productos
    productos.forEach((producto, index) => {
        // Si es el primer producto o un múltiplo del número de productos por div
        if (index % productosPorDiv === 0) {
            // Crear un nuevo div para los productos
            const nuevoDiv = document.createElement('div');

            // Agregar el nuevo div al contenedor
            divImagenes.appendChild(nuevoDiv);
        }

        // Crear el contenido para cada producto
        const productoHTML = `
        <div class="imagenes">
            <img src="${producto.img}" alt="">
            <button id="${producto.id}">Agregar al carrito</button> 
        </div>`;

        // Agregar el producto al div actual
        const divActual = divImagenes.lastElementChild;
        divActual.innerHTML += productoHTML;
    });

}
//Simulo que tarda en cargar la peticion
setTimeout(peticion, 3000)
// DOM
const d = document
const b = d.body
const h = d.headn

//NavBar
// Crear el elemento de navegación
const nav = document.createElement("nav");
nav.classList.add("navbar", "navbar-expand-lg", "navbar-light", "bg-light");

// Crear el contenedor del contenido de la barra de navegación
const container = document.createElement("div");
container.classList.add("container");

// Crear el enlace del logotipo
const logoLink = document.createElement("a");
logoLink.classList.add("navbar-brand");
logoLink.href = "../index.html";
logoLink.textContent = "Mi Sitio Web";
container.appendChild(logoLink);

// Crear el botón para el menú desplegable en dispositivos móviles
const toggleButton = document.createElement("button");
toggleButton.classList.add("navbar-toggler");
toggleButton.type = "button";
toggleButton.setAttribute("data-bs-toggle", "collapse");
toggleButton.setAttribute("data-bs-target", "#navbarNav");
toggleButton.setAttribute("aria-controls", "navbarNav");
toggleButton.setAttribute("aria-expanded", "false");
toggleButton.setAttribute("aria-label", "Toggle navigation");
const toggleIcon = document.createElement("span");
toggleIcon.classList.add("navbar-toggler-icon");
toggleButton.appendChild(toggleIcon);
container.appendChild(toggleButton);

// Crear la lista de elementos de navegación
const navList = document.createElement("ul");
navList.classList.add("navbar-nav", "collapse", "navbar-collapse");
navList.id = "navbarNav";

const navItems = [
    { text: "Inicio", href: "../index.html" },
    { text: "Acerca de", href: "#" },
    { text: "Servicios", href: "#" },
    { text: "Contacto", href: "#" }
];

navItems.forEach(item => {
    const listItem = document.createElement("li");
    listItem.classList.add("nav-item");
    const link = document.createElement("a");
    link.classList.add("nav-link");
    link.href = item.href;
    link.textContent = item.text;
    listItem.appendChild(link);
    navList.appendChild(listItem);
});

container.appendChild(navList);
nav.appendChild(container);
document.body.insertBefore(nav, b.firstChild);

const cuerpo = document.getElementById("cuerpo");
const mensajeCarga = document.createElement('h2');
mensajeCarga.textContent = 'Cargando productos...';
cuerpo.appendChild(mensajeCarga);
let divImagenes = d.createElement('div')
let divCarrito = d.createElement('div')
let h1 = d.createElement('h1')
b.insertBefore(h1, nav.nextSibling);
d.getElementById("cuerpo").appendChild(divImagenes);
d.getElementById("cuerpo").appendChild(divCarrito);
divImagenes.classList.add('productos');
divCarrito.classList.add('carrito');


//Verifica si ya hay un carrito en la session.
const carritoJSON = sessionStorage.getItem("Carrito");

if (sessionStorage.getItem("usuario")) {
    h1.innerHTML = "Bienvenido " + sessionStorage.getItem("usuario") + " !";
} else {
    const registroButton = document.createElement("a");
    registroButton.href = "../login.html";
    registroButton.classList.add("btn", "btn-primary", "ms-auto");
    container.appendChild(registroButton);
    registroButton.textContent = "Registrarse";
}

if (carritoJSON) {
    carrito = JSON.parse(carritoJSON);
    actualizarCarritoEnDOM()
}

divImagenes.addEventListener('click', (event) => {
    const boton = event.target.closest('button');
    if (boton) {
        const id = parseInt(boton.id);
        if (!isNaN(id)) {
            agregarAlCarrito(id);
        }
    }
});




function agregarAlCarrito(id) {
    const productoAgregado = productos.find(producto => producto.id === id);

    if (productoAgregado) {
        const index = carrito.findIndex(producto => producto.id === id);
        if (index !== -1) {
            if (carrito[index].cantidad < productoAgregado.stock) {
                carrito[index].cantidad++;
            } else {
                Swal.fire('No hay mas stock')
                    ;
            }
        } else {
            if (productoAgregado.stock > 0) {
                carrito.push({ ...productoAgregado, cantidad: 1 });
            } else {
                Swal.fire('No hay mas stock')
            }
        }
    }

    actualizarCarritoEnDOM();
    guardarCarritoEnSessionStorage();
}

function actualizarCarritoEnDOM() {
    let total = 0;

    // Limpia el contenido anterior del contenedor del carrito
    divCarrito.innerHTML = '';

    carrito.forEach(producto => {
        divCarrito.innerHTML += `
            <p>
                ${producto.cantidad} x ${producto.tipo} ${producto.marca}
            </p>`;
        total += producto.precio * producto.cantidad;
    });
    divCarrito.innerHTML += `<p>Total: ${total}</p>
                                <button id = "eliminar"> Eliminar </button>`;
    d.getElementById("eliminar").addEventListener('click', () => vaciarCarrito());
}

function vaciarCarrito() {
    carrito = [];
    const carritoJSON = JSON.stringify(carrito);
    sessionStorage.setItem("Carrito", carritoJSON);
    actualizarCarritoEnDOM();
    Swal.fire('Se vacio el carrito')
}

function guardarCarritoEnSessionStorage() {
    const carritoJSON = JSON.stringify(carrito);
    sessionStorage.setItem("Carrito", carritoJSON);
}

function contarElementosConMismoID(arr, id) {
    return arr.filter(elemento => elemento.id === id).length;
}
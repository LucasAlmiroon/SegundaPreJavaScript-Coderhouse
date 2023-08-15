class Producto {
    
    constructor (id, tipo, marca, precio, descripcion, stock, img) {
        this.id = id;
        this.tipo = tipo;
        this.marca = marca
        this.precio = precio;
        this.descripcion = descripcion;
        this.stock = stock;
        this.img = img
    }

    descontarStock (){
        this.stock--
    }

}



let carrito = [];

const productos = [];

const link1 = "img/valija.jpg"
const link2 = "img/mochila.jpg"
const link3 ="img/bolso.jpg"

const valija1 = new Producto (0, "Valija","Travel Tech", 40000, "Valija carry on, 8 ruedas", 5, link1);
const mochila1 = new Producto (1,"Mochila", "Primicia", 30000,"Mochila portanotebook", 2, link2);
const bolso1 = new Producto (2,"Bolso","Nike",21000,"Bolso deportivo", 10, link3);

productos.push(valija1,mochila1,bolso1);
// DOM
const d = document
const b = d.body
const h = d.head
let divImagenes = d.createElement('div')
let divCarrito = d.createElement('div')
b.appendChild(divImagenes);
b.appendChild(divCarrito);
divImagenes.classList.add('productos');
divCarrito.classList.add('carrito');
//Verifica si ya hay un carrito en la session.
const carritoJSON = sessionStorage.getItem("Carrito");
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


productos.forEach(producto => {
    divImagenes.innerHTML += `  <div class="imagenes">
                                <img src="${producto.img}" alt="">
                                <button id="${producto.id}"> Agregar al carrito</button> 
                            </div>`;
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

    // Agrega el total al final del carrito utilizando JSON
    divCarrito.innerHTML += `<p>Total: ${total}</p>
                                <button id = "eliminar"> Eliminar </button>`;
    d.getElementById("eliminar").addEventListener('click', () => vaciarCarrito());
}
function vaciarCarrito(){
    carrito = [];
    const carritoJSON = JSON.stringify(carrito);
    sessionStorage.setItem("Carrito", carritoJSON);
    actualizarCarritoEnDOM();
}

function guardarCarritoEnSessionStorage() {
    const carritoJSON = JSON.stringify(carrito);
    sessionStorage.setItem("Carrito", carritoJSON);
}

function contarElementosConMismoID(arr, id) {
    return arr.filter(elemento => elemento.id === id).length;
}

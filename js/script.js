class Producto {
    
    constructor (id, tipo, marca, precio, descripcion, stock) {
        this.id = id;
        this.tipo = tipo;
        this.marca = marca
        this.precio = precio;
        this.descripcion = descripcion;
        this.stock = stock;
    }

    descontarStock (){
        this.stock--
    }

}
const carrito = [];

const productos = [];

function agregarProducto() {
    pro = prompt ("Escriba que tipo de producto quiere agregar (valija, mochila, bolso)");
    if(pro === "valija" && valija1.stock > 0) {
        valija1.descontarStock()
        carritoCompras(valija1);
    }else if (pro === "mochila" && mochila1.stock > 0) {
        mochila1.descontarStock()
        carritoCompras(mochila1);
    }else if (pro === "bolso" && bolso1.stock > 0) {
        bolso1.descontarStock()
        carritoCompras(bolso1);
    } else {
        console.log("No se encontro producto");
        agregarProducto();
    }
}

function carritoCompras(producto) {
    let total = 0;
    carrito.push(producto);
    console.log("Se agrego: " + producto.tipo + " " + producto.marca + " al carrito")
    total = carrito.reduce((acumulado, p) => acumulado + p.precio, 0);
    console.log("Total de compra: $" + total);
    
    productos.forEach((p) => {
        console.log("De " + p.tipo + " quedan en stock: " + p.stock)
    })

    let comprar = prompt ("Confirmar compra? (Escriba si)");
    if (comprar === "si") {
        confirmarCompra()
    } else {
        agregarProducto()
    }
}

function confirmarCompra () {
    carrito.forEach((producto) => {
        console.log("Quedan: " + producto.stock + " " + producto.tipo + "s");
    })
    carrito.splice();

}



const valija1 = new Producto (0, "Valija","Travel Tech", 40000, "Valija carry on, 8 ruedas", 5);
const mochila1 = new Producto (1,"Mochila", "Primicia", 30000,"Mochila portanotebook", 2);
const bolso1 = new Producto (2,"Bolso","Everlast",21000,"Bolso deportivo", 10);

productos.push(valija1,mochila1,bolso1);

console.log(productos);

agregarProducto();

const filtrarPorPrecio = productos.filter(p => p.precio > 30000);
console.log(filtrarPorPrecio);
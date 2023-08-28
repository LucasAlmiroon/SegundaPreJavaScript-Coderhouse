class Usuario {
    constructor(id, usuario, contrasena) {
        this.id = id;
        this.usuario = usuario;
        this.contrasena = contrasena;
    }
}

const formularioUsuario = document.getElementById("formulario").addEventListener('submit', agregarUsuario);

function agregarUsuario(event) {
    event.preventDefault();

    const usuarioInput = document.querySelector("#nombreUsuario").value;
    const contrasenaInput = document.querySelector("#contrasena").value;

    const newuser = new Usuario(1, usuarioInput, contrasenaInput);
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(newuser),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then(() => {
            sessionStorage.setItem("usuario", usuarioInput);
            Swal.fire("Usuario creado con éxito");

            // Redirigir a otra página después de mostrar el mensaje
            window.location.href = "../index.html";
        });
}
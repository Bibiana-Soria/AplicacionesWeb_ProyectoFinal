const URL = 'http://127.0.0.1:3000'

let usuarios =[]

function cargarUsuarios(){
    fetch(URL + '/usuarios', {
        method: 'GET',
        credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
        usuarios = data
        mostrarUsuarios(usuarios)
    })
    .catch(err=> console.error(err))
}

function mostrarUsuarios(data){
    const tabla = document.getElementById('tabla_usuarios')
    tabla.innerHTML='',
    data.forEach(usuario => {
        const fila = `
         <tr>
            <td>${usuario.id}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.apellidos}</td>
            <td>${usuario.email}</td>
            <td>${usuario.rol}</td>
            <td>
                <button class="editar" onclick="cambiarRol(${usuario.id}, '${usuario.rol}')">Cambiar Rol</button>
                <button class="eliminar" onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
            </td>
        </tr>
        `
        tabla.innerHTML += fila
    })
}

function cambiarRol(id, rol){
    let nuevoRol;
    if (rol === 'admin') {
        nuevoRol = 'empleado';
    } else {
        nuevoRol = 'admin';
    }

    const confirmar = confirm(`¿Cambiar rol a ${nuevoRol}?`)
    if (confirmar){
        fetch(URL + '/usuarios/' +id,{
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({rol: nuevoRol})
        })
        .then(res=> res.text())
        .then(data => {
            alert(data);
            cargarUsuarios()
        })
        .catch(err=> console.error(err))
    }
}

function eliminarUsuario(id){
    const confirmar = confirm('Estas seguro de eliminar este usuario?')

    if(confirmar){
        fetch(URL+'/usuarios/'+ id,{
            method: 'DELETE',
            credentials: 'include'
        })
        .then(res => res.text())
        .then(data => {
            alert(data)
            cargarUsuarios()
        })
        .catch(err=> console.error(err))  
    }
}

function buscarUsuario(){
    const texto = document.getElementById('buscador').value.toLowerCase();
    const usuarios_filtrados = usuarios.filter(usuario =>
        usuario.nombre.toLowerCase().includes(texto) || usuario.apellidos.toLowerCase().includes(texto) || usuario.email.toLowerCase().includes(texto)
    )
    mostrarUsuarios(usuarios_filtrados)
}

function obtenerUsuario(){
    fetch(URL + '/perfil', {
        method: 'GET',
        credentials: 'include'
    })
    .then(res => res.json())
    .then(usuario => {
        document.getElementById('nombre').innerText = `${usuario.nombre} ${usuario.apellidos}`
    })
    .catch(err => console.error(err))
}

document.addEventListener('DOMContentLoaded', obtenerUsuario(), cargarUsuarios())
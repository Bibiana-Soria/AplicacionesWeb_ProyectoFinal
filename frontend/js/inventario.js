const URL ="http://127.0.0.1:3000";

function cargarProductos(){
  fetch(URL + '/inventario', {
    method: 'GET',
    credentials: "include"
  })
  .then(res => res.json())
  .then(data => {productos = data, mostrarProductosTabla(data)} )
  .catch(err => console.error(err));
}

function mostrarProductosTabla(data){
  const tabla = document.getElementById("tabla_inventario");
  tabla.innerHTML = ""; 
    data.forEach(producto => {

      const fila = `
        <tr>
          <td>${producto.id}</td>
          <td>${producto.categoria}</td>
          <td>${producto.nombre}</td>
          <td>${producto.marca}</td>
          <td>${producto.descripcion}</td>
          <td>$${producto.precio}</td>
          <td>${producto.existencia}</td>
          <td>
          <button class="editar" onclick="irModificar(${producto.id})">Modificar</button>
          <button class="eliminar" onclick=irEliminar(${producto.id})>Eliminar</button>
          </td>
        </tr>
      `;

      tabla.innerHTML += fila;

    });

}

function obtenerUsuario() {
    fetch(URL + '/perfil', {
        method: 'GET',
        credentials: 'include'
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Sesión no iniciada');
        }
        return res.json();
    })
    .then(usuario => {
        console.log("Usuario identificado:", usuario);
        document.getElementById('nombre').innerText = 
             `${usuario.nombre} ${usuario.apellidos}`;
    })
    .catch(err => {
        console.error(err.message);
    });
}

function irModificar(id){
  window.location.href= `../pages/put_producto.html?id=${id}`
}

function irEliminar(id) {
  const confirmar = confirm('¿Estás seguro de que deseas eliminar este producto?');
  
  if (confirmar) {
    fetch(URL + '/inventario/' + id, {
      method: 'DELETE',
      credentials: 'include'
    })
    .then(res => res.text())
    .then(data => {
      console.log(data);
      alert(data);
      if(data === 'Producto Eliminado'){
        cargarProductos();
      }
    })
    .catch(err => {
      console.log(err);
      alert('Error al eliminar producto');
    });
  }
}

function buscarProducto(){
  const texto = document.getElementById('buscador').value.toLowerCase()
  const productos_filtrados = productos.filter(producto => 
    producto.nombre.toLowerCase().includes(texto) || producto.categoria.toLowerCase().includes(texto) || producto.marca.toLowerCase().includes(texto)
  )
  mostrarProductosTabla(productos_filtrados)
}
document.addEventListener('DOMContentLoaded', cargarProductos(), obtenerUsuario());
const URL = 'http://127.0.0.1:3000';
const params = new URLSearchParams(window.location.search)
const id = params.get("id")


function obtenerDatos(id){
  fetch(URL + '/inventario/' + id,{
    method: 'GET',
    credentials: 'include'
  })
  .then(res=>res.json())
  .then(producto =>{
    document.getElementById('categoria').value = producto.categoria;
    document.getElementById('nombre').value = producto.nombre;
    document.getElementById('marca').value = producto.marca;
    document.getElementById('descripcion').value = producto.descripcion
    document.getElementById('precio').value= producto.precio
    document.getElementById('existencia').value = producto.existencia

    const tabla = document.getElementById('tabla_inventario');
    tabla.innerHTML = `
      <tr>
        <td>${producto.id}</td>
        <td>${producto.categoria}</td>
        <td>${producto.nombre}</td>
        <td>${producto.marca}</td>
        <td>${producto.descripcion}</td>
        <td>$${producto.precio}</td>
        <td>${producto.existencia}</td>
      </tr>
    `;

  })
  .catch(err=> console.error('Error cargando el producto', err))
}
document.addEventListener("DOMContentLoaded", ()=> obtenerDatos(id))
function modificarProducto(){
    const datos_producto = {
      categoria:   document.getElementById("categoria").value,
      nombre:      document.getElementById("nombre").value,
      marca:       document.getElementById("marca").value,
      descripcion: document.getElementById("descripcion").value,
      precio: document.getElementById('precio').value,
      existencia: document.getElementById('existencia').value
    }
    
    fetch(URL + '/inventario/' + id,{
        method: 'PUT',
        credentials: 'include',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(datos_producto)
      })
    .then(res=> res.text())
    .then(data => {
        console.log(data);
        alert('Producto actualizado correctamente');
        window.location.href='../pages/inventario.html'
    })
    .catch(err => {
        console.log(err);
        alert('Error al actualizar producto');
    });
}
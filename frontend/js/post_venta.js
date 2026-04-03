const URL = 'http://127.0.0.1:3000';
function cargarProductos(){

  fetch(URL + '/inventario', {
    method: 'GET',
    credentials: "include"
  })
  .then(res => res.json())
  .then(data => {
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
        </tr>
      `;

      tabla.innerHTML += fila;

    });

  })
  .catch(err => console.error(err));
}

function crearVenta() {
    const id_producto = document.getElementById('id_producto').value;
    const unidades_vendidas = document.getElementById('unidades_vendidas').value;

    fetch(URL + '/perfil', {
        method: 'GET',
        credentials: 'include'
    })
    .then(res => res.json())
    .then(usuario => {
        return fetch(URL + '/inventario', {
            method: 'GET',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(productos => {
            const producto = productos.find(p => p.id == id_producto);
            if (!producto) {
                alert('Producto no encontrado');
                return;
            }

            const total = producto.precio * unidades_vendidas;
            const fecha = new Date().toISOString().slice(0, 10);
            if (unidades_vendidas>producto.existencia){
                alert(`No hay suficientes unidades de ${producto.nombre}, solo hay ${producto.existencia} unidades disponibles`)
                return false
            }

            return fetch(URL + '/ventas', {
                method: 'POST',
                credentials: 'include',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_usuario: usuario.id,
                    id_producto: producto.id,
                    nombre: producto.nombre,
                    categoria: producto.categoria,
                    unidades_vendidas: unidades_vendidas,
                    total: total,
                    fecha: fecha
                })
            })
            .then(res => res.text())
            .then(data => {
                if (data.includes('agregada')) {
                    const nuevaExistencia = producto.existencia - unidades_vendidas
                    fetch( URL + '/inventario/'+ producto.id,{
                        method: 'PUT',
                        credentials: 'include',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            categoria: producto.categoria,
                            nombre: producto.nombre,
                            marca: producto.marca,
                            descripcion: producto.descripcion,
                            precio: producto.precio,
                            existencia: nuevaExistencia
                        })
                    })
                    .then(alert('Venta Añadida'),window.location.href="../pages/ventas.html"
                    )
                    .catch(err=> console.error('Error al actualizar existencia', err))
                } else {
                    alert(data);
                }
            });
        });
    })
    .catch(err => console.error(err));
}

document.addEventListener('DOMContentLoaded', cargarProductos);
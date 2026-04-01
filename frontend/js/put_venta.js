const URL = 'http://127.0.0.1:3000';
const params = new URLSearchParams(window.location.search)
const id = params.get('id')

function obtenerDatos(id){
    fetch(URL + '/ventas/' + id,{
        method: 'GET',
        credentials: 'include'
    })
    .then(res=>res.json())
    .then(venta => {
        document.getElementById('cantidad')
        const tabla = document.getElementById('tabla_ventas')
        tabla.innerHTML = `
            <tr>
                <td>${venta.id}</td>
                <td>${venta.id_usuario}</td>
                <td>${venta.id_producto}</td>
                <td>${venta.nombre}</td>
                <td>${venta.categoria}</td>
                <td>${venta.unidades_vendidas}</td>
                <td>${venta.total}</td>
               <td>${new Date(venta.fecha).toLocaleDateString()}</td>
            </tr>
        
        `
        fetch(URL + '/inventario/' + venta.id_producto,{
            method: 'GET',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(producto => {
            document.getElementById('precio').value = producto.precio
        })
        .catch(err => console.error('error cargando el precio', err))
    })
    .catch(err=> console.error("Error cargando las ventas", err))
}
document.addEventListener("DOMContentLoaded", obtenerDatos(id))

function modificarVenta(){
    const unidades_vendidas = document.getElementById('cantidad').value
    const precio = document.getElementById('precio').value

    if(!unidades_vendidas){
        alert('Completa los campos')
    }
    const total = unidades_vendidas*precio
    fetch(URL + '/ventas/' + id, {
        method: 'PUT',
        credentials: 'include',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            unidades_vendidas,
            total
        })
    })
    .then(res=> res.text())
    .then(data => {
        console.log(data);
        alert('Venta actualizada');
        window.location.href="../pages/ventas.html"
    })
    .catch(err => {
        console.log(err);
        alert('Error al actualizar venta');
    });
}
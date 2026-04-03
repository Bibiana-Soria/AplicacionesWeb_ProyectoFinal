const URL = 'http://127.0.0.1:3000';

function cargarVentas(){
    fetch(URL + '/ventas',{
        method: 'GET',
        credentials: 'include'
    })
    .then(res=> res.json())
    .then(data=>{ventas = data, mostrarVentasTabla(data)})
    .catch(err=> console.error(err))
}

function mostrarVentasTabla(data){
    const tabla = document.getElementById('tabla_ventas')
    tabla.innerHTML=""
        data.forEach(venta => {
            const acciones = user_rol === 'admin' ? `
            <button class="editar" onclick="irModificar(${venta.id})">Modificar</button>
            <button class="eliminar" onclick="irEliminar(${venta.id})">Eliminar</button>
        ` : '';
            const fila = `
              <tr>
                <td>${venta.id}</td>
                <td>${venta.id_usuario}</td>
                <td>${venta.id_producto}</td>
                <td>${venta.nombre}</td>
                <td>${venta.categoria}</td>
                <td>${venta.unidades_vendidas}</td>
                <td>${venta.total}</td>
                <td>${new Date(venta.fecha).toLocaleDateString()}</td>
                <td>${acciones}</td>
              </tr>
            `;
            tabla.innerHTML+= fila
            
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
        document.getElementById('nombre').innerText = ` ${usuario.nombre} ${usuario.apellidos}`;
        user_rol = usuario.rol
        cargarVentas()
        if(usuario.rol!=="admin"){
            document.querySelectorAll('.editar, .eliminar').forEach(btn=> btn.style.display = 'none')
        }
        if(usuario.rol === 'admin'){
            document.getElementById('menu_usuarios').style.display = 'block';
        }
    })
    .catch(err => {
        console.error(err.message);
    });
}

function irModificar(id){
    window.location.href=`../pages/put_venta.html?id=${id}`
}

function irEliminar(id){
    const confirmar = confirm('¿Estás seguro de que deseas eliminar esta venta?')

    if (confirmar){
        fetch(URL + '/ventas/'+ id, {
            method: 'DELETE',
            credentials: 'include'
        })
        .then(res => res.text())
        .then(data=>{
            console.log(data)
            alert(data)
            if(data === 'Venta eliminada'){
                cargarVentas();
            }
        })
    }
}

function buscarVenta(){
    const texto = document.getElementById('buscador').value.toLowerCase()
    const ventas_filtradas = ventas.filter(venta =>
        venta.nombre.toLowerCase().includes(texto) || venta.categoria.toLowerCase().includes(texto)
    )
    mostrarVentasTabla(ventas_filtradas)
}

document.addEventListener('DOMContentLoaded',obtenerUsuario())
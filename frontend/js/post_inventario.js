const URL = 'http://127.0.0.1:3000';

function crearProducto(){
    const categoria = document.getElementById('categoria').value
    const nombre = document.getElementById('nombre').value
    const marca =document.getElementById('marca').value
    const descripcion = document.getElementById('descripcion').value
    const precio = document.getElementById('precio').value
    const existencia = document.getElementById('existencia').value

    if (!categoria || !nombre || !marca || !descripcion || !precio || !existencia){
        alert('Completa todos los campos');
        return false;
    }

    fetch(URL + '/inventario', {
        method: 'POST',
        credentials: 'include',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            categoria: categoria,
            nombre: nombre,
            marca: marca,
            descripcion: descripcion,
            precio: precio,
            existencia: existencia})
    })
    .then(res=> res.text())
    .then(data=>{
        if (data.includes('Agregado')){
            alert('Producto Añadido')
            window.location.href='../pages/inventario.html'
        }else{
            alert(data)
        }
    })
    .catch(err=>{console.log(err)})
}
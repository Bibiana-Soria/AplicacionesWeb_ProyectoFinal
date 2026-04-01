const URL = 'http://127.0.0.1:3000';

function crearUsuario(){
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const email = document.getElementById('email').value;
    const contrasena = document.getElementById('contrasena').value

    if (!nombre || !apellidos || !email || !contrasena){
        alert('Completa todos los campos')
        return false;
    };

    fetch(URL + '/sesion',{
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
        body: JSON.stringify({
            nombre: nombre,
            apellidos: apellidos,
            email: email,
            contrasena: contrasena})
        })
    .then(res=> res.text())
    .then(data => {
        console.log(data)
        if (data.includes('creado')){
            alert('Usuario Creado');
            window.location.href='../index.html'
        }else{
            alert(data)
        }
    })
    .catch(err=>{console.log(err)})
}   
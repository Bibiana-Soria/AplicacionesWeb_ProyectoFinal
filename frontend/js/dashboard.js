const URL = 'http://127.0.0.1:3000';
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
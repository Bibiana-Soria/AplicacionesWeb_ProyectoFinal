function logOut(){
    fetch(URL + '/logout', {
        method: 'GET',
        credentials: 'include'
    })
    .then(
        window.location.href= '../index.html'
    )
    .catch(err=> console.error('Error al cerrar sesion', err))
}

document.addEventListener('DOMContentLoaded', () => {
    fetch(URL + '/perfil', {
        method: 'GET',
        credentials: 'include'
    })
    .then(res => {
        if (!res.ok) {
            window.location.href = '../index.html';
        }
    })
    .catch(() => {
        window.location.href = '../index.html';
    });
});
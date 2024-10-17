// Función para guardar el token en localStorage
function guardarToken(token) {
    localStorage.setItem('bearerToken', token);
}

// Función para cargar el token desde localStorage
function cargarToken() {
    return localStorage.getItem('bearerToken');
}
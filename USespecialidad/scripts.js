document.getElementById('form-turno').addEventListener('submit', function(e) {
    e.preventDefault();

    const especialidad = document.getElementById('especialidad').value;
    const fecha = document.getElementById('fecha').value;
    const resultadoDiv = document.getElementById('resultado');

    if (especialidad && fecha) {
        resultadoDiv.innerHTML = `
            <p>Especialidad seleccionada: <strong>${especialidad.charAt(0).toUpperCase() + especialidad.slice(1)}</strong></p>
            <p>Fecha de consulta: <strong>${fecha}</strong></p>
            <p>¡Turno reservado exitosamente!</p>
        `;
    } else {
        resultadoDiv.innerHTML = '<p style="color: red;">Por favor, selecciona una especialidad y una fecha válida.</p>';
    }
});

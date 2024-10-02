let selectedYear = null;

var listaTurnos = [];
var gene = true;

async function queryTurnos() {
  try {
      // Hacer la solicitud al servidor
      url = 'http://localhost:8080/verTurnos?especialidadID=1'
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
      }
      const data = await response.json();
      listaTurnos = data;
      return listaTurnos;
  } catch (error) {
      console.error('Error:', error);
      popup("No se pudo conectar con el servidor, inténtelo más tarde." + url);
  }
}


function reservarTurno(id) {
    const data = new URLSearchParams();
    data.append('turnoID', id);
    data.append('pacienteID', 1);

    fetch('http://localhost:8080/reservarTurno', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data.toString()
    })
    .then(response => {
        // Verificar si el servidor devolvió un JSON válido
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            return response.json(); // Si es JSON, parsearlo
        } else {
            return response.text(); // Si no es JSON, tratarlo como texto
        }
    })
    .then(result => {
        if (typeof result === 'string') {
            // Caso de que el servidor devuelva texto en lugar de JSON
            console.log('Response as text:', result);
            popup(result); // Mostrar el mensaje del servidor
        } else {
            // Caso de que el servidor devuelva un JSON válido
            console.log('Success:', result);
            popup("Turno reservado con éxito");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        popup("Error al reservar el turno");
    });
}







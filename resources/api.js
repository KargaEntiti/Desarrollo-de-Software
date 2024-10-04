

api_url = 'http://localhost:8080'

async function api_queryTurnos(especialidadID) {
  var listaTurnos = [];
  try {
      // Hacer la solicitud al servidor
      url = 'http://localhost:8080/verTurnos?especialidadID=' + especialidadID
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

async function api_queryEspecialidades(){
  try {
      // Hacer la solicitud al servidor
      url = 'http://localhost:8080/verEspecialidades'
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
      }
      const data = await response.json();
      especialidades = data;
      return especialidades;
  } catch (error) {
      console.error('Error:', error);
      popup("No se pudo conectar con el servidor, inténtelo más tarde." + url);
  }
}


function api_reservarTurno(id) {
    const data = new URLSearchParams();
    data.append('turnoID', id);
    data.append('pacienteID', 2); // Asegúrate de que este ID exista en la base de datos

    fetch('http://localhost:8080/reservarTurno', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data.toString()
    })
    .then(response => {
        if (response.ok) {
            // Si la respuesta es 200 OK
            popup("Turno reservado con éxito");necesario
        } else {
            // Si hay un error, lanzar un error con el estado
            return response.json().then(error => {
                throw new Error(error.message || "Error desconocido al reservar el turno");
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Mostrar popup de error
        popup("Error al reservar el turno, puede que ya este reservado.");
    });
}







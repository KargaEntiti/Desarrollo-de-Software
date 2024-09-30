let selectedDay = null; // Variable para almacenar el día seleccionado
let selectedHour = null; // Variable para almacenar la hora seleccionada

// Función para generar los días en base al mes y año seleccionados
function generateDays() {
  const daysTable = document.getElementById("daysTable");
  daysTable.innerHTML = ""; // Limpiar la tabla existente

  var year = document.getElementById("yearSelect").value;
  var month = document.getElementById("monthSelect").value;

  // Obtener el primer día del mes y el último día
  const firstDay = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, parseInt(month) + 1, 0).getDate();

  // Crear los encabezados para los días de la semana
  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  let headerRow = document.createElement("tr");
  for (let day of weekDays) {
    let th = document.createElement("th");
    th.textContent = day;
    headerRow.appendChild(th);
  }
  daysTable.appendChild(headerRow);

  // Crear las filas de la tabla para los días
  let row = document.createElement("tr");
  // Crear celdas vacías antes del primer día
  for (let i = 0; i < firstDay; i++) {
    let cell = document.createElement("td");
    row.appendChild(cell);
  }

  // Crear celdas para cada día del mes
  for (let day = 1; day <= lastDay; day++) {
    if (row.children.length === 7) {
      daysTable.appendChild(row);
      row = document.createElement("tr");
    }

    let cell = document.createElement("td");
    cell.textContent = day;
      
    cell.onclick = function() {
      day = String(day).padStart(2, '0');
      month = String(month).padStart(2, '0');
      console.log("has seleccionado " + day +"/" + month +"/"+ year);
        
      fechaCompleta = day + "/" + month + "/" + year
      filtrarPorFecha(fechaCompleta);
      selectDay(cell, day);
    };
    row.appendChild(cell);
  }

  // Añadir la fila restante
  if (row.children.length > 0) {
    daysTable.appendChild(row);
  }
}

// Función para seleccionar un día y resaltarlo
function selectDay(cell, day) {
  // Desmarcar cualquier día previamente seleccionado
  const previousSelected = document.querySelector(".selected-day");
  if (previousSelected) {
    previousSelected.classList.remove("selected-day");
  }

  // Marcar el nuevo día seleccionado
  cell.classList.add("selected-day");
  selectedDay = day; // Guardar el día seleccionado

  // Mostrar el día seleccionado
  document.getElementById("selectedValue").textContent = "Día seleccionado: " + day;
}

// Función para generar los años en el selector de año
function generateYears() {
  const yearSelect = document.getElementById("yearSelect");
  const currentYear = new Date().getFullYear();

  // Generar opciones de año dinámicamente (últimos 100 años)
    for (let year = currentYear; year <= currentYear + 10; year++) {
      const option = document.createElement('option');
      option.value = year;
      option.textContent = year;
      yearSelect.appendChild(option);
    }
}

// Función para actualizar los días cuando cambian el mes o el año
function updateDays() {
  generateDays(); // Regenerar los días disponibles
}
/*
// Función para generar la tabla de horarios con intervalos de 30 minutos
function generateHours() {
  const hoursTable = document.getElementById("hoursTable");
  hoursTable.innerHTML = ""; // Limpiar la tabla existente

  // Generar las horas de 00:00 a 23:30 en intervalos de 30 minutos
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      let row = document.createElement("tr");
      let cell = document.createElement("td");

      // Formato para mostrar la hora en HH:MM
      let formattedHour = hour.toString().padStart(2, '0') + ":" + minute.toString().padStart(2, '0');
      cell.textContent = formattedHour;
      cell.onclick = function() {
        selectHour(cell, formattedHour);
      };

      row.appendChild(cell);
      hoursTable.appendChild(row);
    }
  }
}

// Función para seleccionar una hora y resaltarla
function selectHour(cell, hour) {
  // Desmarcar cualquier hora previamente seleccionada
  const previousSelectedHour = document.querySelector(".selected-hour");
  if (previousSelectedHour) {
    previousSelectedHour.classList.remove("selected-hour");
  }

  // Marcar la nueva hora seleccionada
  cell.classList.add("selected-hour");
  selectedHour = hour; // Guardar la hora seleccionada

  // Mostrar la hora seleccionada
  document.getElementById("selectedHour").textContent = "Hora seleccionada: " + hour;
}
*/

function generateHours() {
  const selectElement = document.getElementById("hoursSelect");
  selectElement.innerHTML = ""; // Limpiar las opciones existentes

  // Generar las opciones de hora de 08:00 a 23:00 en intervalos de 30 minutos
  for (let hour = 8; hour < 21; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      let option = document.createElement("option");
      let formattedHour = hour.toString().padStart(2, '0') + ":" + minute.toString().padStart(2, '0');
      option.value = formattedHour;
      option.textContent = formattedHour;
      selectElement.appendChild(option);
    }
  }
}

// Función para manejar la selección de una hora
function selectHour(event) {
  const selectedHour = event.target.value;
  document.getElementById("selectedHour").textContent = selectedHour;
  // Aquí puedes realizar acciones adicionales con la hora seleccionada, como enviar los datos
}

// Función para enviar la fecha y hora seleccionada al backend
/*
function sendDate() {
  const year = document.getElementById("yearSelect").value;
  const month = document.getElementById("monthSelect").value;

  if (selectedDay === null) {
    alert("Por favor, seleccione un día.");
    return;
  }

  if (selectedHour === null) {
    alert("Por favor, seleccione una hora.");
    return;
  }

  const selectedDateTime = {
    day: selectedDay,
    month: parseInt(month) + 1, // Añadir 1 al mes porque en JavaScript empieza en 0
    year: year,
    hour: selectedHour
  };
    

  // Hacer una solicitud POST al backend
  fetch('URL_DEL_BACKEND', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(selectedDateTime)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Éxito:', data);
    alert('Fecha y hora enviadas correctamente.');
  })
  .catch((error) => {
    console.error('Error:', error);
    alert('Error al enviar la fecha y hora.');
  });
}
*/

// Inicializar la página al cargar
window.onload = function() {
  generateYears(); // Llenar el selector de años
  const today = new Date();
  document.getElementById("monthSelect").value = today.getMonth(); // Seleccionar el mes actual
  document.getElementById("yearSelect").value = today.getFullYear(); // Seleccionar el año actual
  generateDays(); // Generar los días para el mes y año actuales
  //generateHours(); // Generar las horas
  queryTurnos();
};

function queryTurnos(){
// Solicitud get, llena la tabla de turnos con los datos
    // Hacer la solicitud al servidor
    fetch('http://localhost:8080/verTurnos?especialidadID=1')
        .then(response => response.json())
        .then(data => {
            // Obtener la tabla donde se insertarán los datos
            const tableBody = document.querySelector("#tablaTurnos tbody");

            // Recorrer cada turno en el JSON recibido
            data.forEach(turno => {
                // Crear una fila de la tabla
                const row = document.createElement("tr");
                
                // Declarar variables de fecha
                const fechaIso = turno.fecha;
                const fechaDate = new Date(fechaIso);
                
                //turno id
                const turnoID = turno.turnoID;
                
                // Nombre
                const nombreMedicoCell = document.createElement("td");
                nombreMedicoCell.textContent = turno.nombreMedico;
                row.appendChild(nombreMedicoCell);

                // Apellido
                const apellidoMedicoCell = document.createElement("td");
                apellidoMedicoCell.textContent = turno.apellidoMedico;
                row.appendChild(apellidoMedicoCell);
                
                // Especialidad
                const especialidadCell = document.createElement("td");
                especialidadCell.textContent = turno.especialidadMedico;
                row.appendChild(especialidadCell);

                // fecha
                const fechaCell = document.createElement("td");
                // Formato día/mes/año
                const dia = fechaDate.getDate().toString().padStart(2, '0'); // Añade un 0 si el día es menor a 10
                const mes = (fechaDate.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan desde 0, por eso sumamos 1
                const año = fechaDate.getFullYear();
                const fechaFormateada = `${dia}/${mes}/${año}`;
                fechaCell.textContent = fechaFormateada;
                row.appendChild(fechaCell);
                
                // hora
                const horaCell = document.createElement("td");
                const horas = fechaDate.getHours().toString().padStart(2, '0');
                const minutos = fechaDate.getMinutes().toString().padStart(2, '0');
                const horaFormateada = `${horas}:${minutos}`;
                horaCell.textContent = horaFormateada;
                row.appendChild(horaCell);
                
                // ReservarTurno
                const buttonCell = document.createElement("td");
                const button = document.createElement("button");
                button.textContent = "Reservar"
                button.classList.add("reservarBoton");
                buttonCell.appendChild(button);
                button.addEventListener("click", function() {
                    reservarTurno(turnoID);
                });
                row.appendChild(buttonCell);


                // Añadir la fila a la tabla
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error:', error)
            popup("No se pudo conectar con el servidor, intentelo mas tarde.");
        });
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

function popup(message) {
    alert(message);
}


function filtrarPorFecha(fechaCompleta) {
    const fechaFiltro = fechaCompleta; // La fecha que quieres filtrar en formato DD/MM/YYYY
    const tabla = document.getElementById("tablaTurnos");
    const filas = tabla.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

    for (let i = 0; i < filas.length; i++) {
        const celdaFecha = filas[i].getElementsByTagName("td")[3]; // Segunda columna
        const fecha = celdaFecha.innerText;

        // Si la fecha no coincide con el filtro, ocultamos la fila
        if (fecha !== fechaFiltro) {
            console.log("la fecha buscada " + fechaFiltro + "no coincide con la fecha " + fecha )
            filas[i].style.display = "none"; // Ocultar la fila
        } else {
            filas[i].style.display = ""; // Mostrar la fila
        }
    }
}
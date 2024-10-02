let selectedDay = null; // Variable para almacenar el día seleccionado
let selectedHour = null; // Variable para almacenar la hora seleccionada

// Función para generar los días en base al mes y año seleccionados
function generateDays() {
  const daysTable = document.getElementById("daysTable");
  daysTable.innerHTML = ""; // Limpiar la tabla existente

  const year = document.getElementById("yearSelect").value;
  const month = document.getElementById("monthSelect").value;

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
  for (let year = currentYear; year >= currentYear - 100; year--) {
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

// Función para enviar la fecha y hora seleccionada al backend
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
    alert('se envio el archivo.');
  });
}

// Inicializar la página al cargar
window.onload = function() {
  generateYears(); // Llenar el selector de años
  const today = new Date();
  document.getElementById("monthSelect").value = today.getMonth(); // Seleccionar el mes actual
  document.getElementById("yearSelect").value = today.getFullYear(); // Seleccionar el año actual
  generateDays(); // Generar los días para el mes y año actuales
  generateHours(); // Generar las horas
};

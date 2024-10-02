let selectedYear = null;

// Función para generar los días en base al mes y año seleccionados
function generateCallendar() {
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
    
    day = String(day).padStart(2, '0');
    month = String(month).padStart(2, '0');

    fechaCompleta = day + "/" + month + "/" + year

    if(isAvaliable(fechaCompleta)){
      console.log("pintando " + fechaCompleta);
      highlightDay(cell,day);
    }
      
    cell.onclick = function() {
    
      day = String(day).padStart(2, '0');
      month = String(month).padStart(2, '0');

      fechaCompleta = day + "/" + month + "/" + year
        
      filtrarPorFecha(fechaCompleta);
      selectDay(cell, day);
      selectedYear = year;
        
    };
    console.log("generando row de dia")

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

  // Mostrar el día seleccionado
  document.getElementById("selectedValue").textContent = "Día seleccionado: " + day;
}

// Función para seleccionar un día y resaltarlo
function highlightDay(cell, day) {
  // Marcar el nuevo día seleccionado
  cell.classList.add("avaliable-day");
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


function generateMonths(){
  const monthSelect = document.getElementById('monthSelect');
  const yearSelect = document.getElementById('yearSelect');
  const currentYear = new Date().getFullYear(); // Obtiene el año actual
  const currentMonth = new Date().getMonth(); // Obtiene el mes actual (0 - enero, 11 - diciembre)
  const selectedYear = parseInt(yearSelect.value); // Año seleccionado en el select
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  // Limpiamos el select de meses
  monthSelect.innerHTML = '';

  // Si el año seleccionado es mayor al actual, mostrar todos los meses
  const startMonth = (selectedYear > currentYear) ? 0 : currentMonth;

  // Agregamos los meses desde el mes de inicio hasta diciembre
  for (let i = startMonth; i < months.length; i++) {
    const option = document.createElement('option');
    option.value = i + 1; // Los valores van de 1 a 12
    option.textContent = months[i];
    monthSelect.appendChild(option);
  }
}




var listaTurnos = [];
var gene = true;

async function queryTurnos() {
  try {
      // Hacer la solicitud al servidor
      const response = await fetch('http://localhost:8080/verTurnos?especialidadID=1');
      if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
      }
      const data = await response.json();
      listaTurnos = data;
      llenarTurnosDisponibles(listaTurnos);
  } catch (error) {
      console.error('Error:', error);
      popup("No se pudo conectar con el servidor, inténtelo más tarde.");
  }
}

function llenarTurnosDisponibles(turnos){
    turnos.forEach(turno => {
        
        // Obtener la tabla donde se insertarán los datos
        const tableBody = document.querySelector("#tablaTurnos tbody");
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
        console.log("generando row de turno")
        tableBody.appendChild(row);
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

function isAvaliable(fechaCompleta){
    
    const fechaFiltro = fechaCompleta;
    const tabla = document.getElementById("tablaTurnos");
    const filas = tabla.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

    for (let i = 0; i < filas.length; i++) {
        console.log("isavas");
        const celdaFecha = filas[i].getElementsByTagName("td")[3];
        const fecha = celdaFecha.innerText;

        // Si la fecha coincide con la solicitada, devolver true
        if (fecha == fechaFiltro) {
            return true;
        }else{
          console.log(fecha + " no coincide con " + fechaFiltro);
        }
    }
}

function filtrarPorFecha(fechaCompleta) {
    const fechaFiltro = fechaCompleta;
    const tabla = document.getElementById("tablaTurnos");
    const filas = tabla.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

    for (let i = 0; i < filas.length; i++) {
        const celdaFecha = filas[i].getElementsByTagName("td")[3];
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

async function main(){

    await queryTurnos();
    //Selectores:
    generateYears(); 
    generateMonths();
    const today = new Date();
    const monthValue = Number(today.getMonth()) + 1; 
    document.getElementById("monthSelect").value = monthValue.toString();
    document.getElementById("yearSelect").value = today.getFullYear(); // Seleccionar el año actual
    generateCallendar();
  }
  
main();

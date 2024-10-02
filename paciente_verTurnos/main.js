async function main(){

    turnos = await queryTurnos();
    llenarTurnosDisponibles(turnos);
    // Inicializar todo
    generarCalendario();


  }
  
main();
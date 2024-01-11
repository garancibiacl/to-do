// Se define letiable que se convierte en un array vacio para almacenar las tareas
let tareas = [];

// Función para agregar una tarea al array
function agregarTareas() {
  let tareaTexto = prompt('Ingrese una nueva tarea:');

  if (tareaTexto !== null) {
    tareas.push(tareaTexto);
    alert('Tarea agregada: ' + tareaTexto);
  } else {
    alert('Operación cancelada. No se agregó ninguna tarea.');
  }

  // Preguntar al usuario si quiere agregar otra tarea
  let agregarOtro = confirm('¿Desea agregar otra tarea?');
  
  if (agregarOtro) {
    agregarTareas(); // Llamada recursiva para agregar otra tarea
  } else {
    alert('Lista de tareas finalizada.');
    mostrarTareas(); // Mostrar la lista de tareas al final
  }
}

// Función para mostrar la lista de tareas
function mostrarTareas() {
  if (tareas.length === 0) {
    alert('No hay tareas en la lista.');
  } else {
    alert('Lista de tareas:\n' + tareas.join('\n'));
  }
}

// Llamada a la función para agregar tarea
agregarTareas();

// Mostrar resultado de la interaccion en el array
console.log(tareas)
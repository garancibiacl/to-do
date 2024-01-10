
// Se define variable que se convierte en un array vacio para almacenar las tareas
let tarea = [];

// Función para agregar una tarea
function agregarTarea() {
  let tareaText = prompt('Ingrese una nueva tarea:');

  if (tareaText !== null) {
    tarea.push(tareaText);
    alert('Tarea agregada: ' + tareaText);
  } else {
    alert('Por favor, ingrese una tarea válida.');
  }
}

// Llamada a la función para agregar tarea
agregarTarea();


// Mostrar resultado de la interaccion
console.log(tarea)

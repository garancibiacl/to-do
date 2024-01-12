// Se define variable que se convierte en un array vacio para almacenar las tareas
const tareas = [];


// Función para agregar una tarea al array utilizando metodo push
function agregarTareas(tarea) {
  if (tarea !== null ) {
    tareas.push(tarea);
    alert('Tarea agregada: ' + tarea);
  } else {
    alert('Por favor, ingrese una tarea válida.');
  }
}



// Ciclo while para permitir al usuario agregar tareas
while (true) {
  let userInput = prompt('Ingrese una nueva tarea (o escriba "fin" para terminar):');
 
  if (userInput === 'fin') {
    alert('Lista de tareas finalizada.');
    break; // Salir del bucle al escribir "fin"
  }

  agregarTareas(userInput);
}




// Ciclo for para mostrar a través del array una cadena que contiene la lista de tareas
let listaTareas = 'Lista de tareas:\n';

  for (let i = 0; i < tareas.length; i++) {
    listaTareas += (i + 1) + '. ' + tareas[i] + '\n';
  }

  alert(listaTareas);



// Mostrar resultado de la interaccion en el array  que contiene la lista de tareas
console.log(tareas) 
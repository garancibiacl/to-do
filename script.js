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




// Ciclo for para mostrar la lista de tareas

for (let i = 0; i < tareas.length; i++) {
 alert('Lista de tareas agregadas:\n' + tareas.join('\n'));
}
alert('Lista de tareas agregadas:');


// Mostrar resultado de la interaccion en el array
console.log(tareas) 
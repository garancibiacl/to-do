document.addEventListener('DOMContentLoaded', function () {
  // Obtener elementos del DOM
  let taskInput = document.getElementById('taskInput');
  let agregarTareasBtn = document.getElementById('agregarTareasBtn');
  let listaTareas = document.getElementById('listaTareas');

  // Obtener tareas del LocalStorage o inicializar un array vacío
  let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

  // Función para renderizar la lista de tareas
  function renderTasks() {
    listaTareas.innerHTML = '';
    tareas.forEach(function (tarea, index) {
      let li = document.createElement('li');
      li.innerHTML = `
        <h3 class="col-auto " >${tarea}</h3>
        <button class="btn btn-danger mx-5 mb-4" onclick="deleteTask(${index})"> <i class="fas fa-trash"></i>  Eliminar</button>
      `;
      listaTareas.appendChild(li);
    });
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }

  // Función para agregar una nueva tarea
  function agregarTareas() {
    let taskText = taskInput.value.trim();
    if (taskText !== '') {
      tareas.push(taskText);
      renderTasks();
      taskInput.value = '';
    }
  }

  // Función para eliminar una tarea
  window.deleteTask = function (index) {
    tareas.splice(index, 1);
    renderTasks();
  };

  // Evento click para agregar tarea
  agregarTareasBtn.addEventListener('click', agregarTareas);

  // Renderizar tareas al cargar la página
  renderTasks();
});

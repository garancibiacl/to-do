
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=3871336&appid=60130eaeddb1c426eb847d008f0af976`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const weatherElement = document.getElementById('weather');
    const { main, description } = data.weather[0];
    const { temp, feels_like } = data.main;
    const cityName = data.name;
    weatherElement.innerHTML = 
    `<span class="badge text-bg-success">Ciudad: ${cityName}</span>
     <span class="badge text-bg-warning">Temperature: ${temp}°C</span>`;

                                
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });









function guardarTareas(tareaPorCategoria) {
    localStorage.setItem('tareaPorCategoria', JSON.stringify(tareaPorCategoria));
  }

  function cargarTareas() {
    return JSON.parse(localStorage.getItem('tareaPorCategoria')) || {
      personal: [],
      trabajo: [],
      estudio: []
    };
  }

  document.addEventListener('DOMContentLoaded', function () {
    const tareaInput = document.getElementById('tareaInput');
    const seleccionarCategoria = document.getElementById('seleccionarCategoria');
    const agregarTareaBtn = document.getElementById('agregarTareaBtn');
    const listaDeTareas = document.getElementById('listaDeTareas');
    const categoriaFiltros = document.getElementById('categoriaFiltros');

    let tareaPorCategoria = cargarTareas();

    function renderTareas(category) {
      listaDeTareas.innerHTML = '';
      tareaPorCategoria[category].forEach(function (task, index) {
        let li = document.createElement('li');
        li.innerHTML = `
          <input class="form-check-input" type="checkbox" id="task${index}" ${task.completed ? 'checked' : ''}>
          <label  for="task${index}" class="${task.completed ? 'task-completed' : ''}">${task.text}</label>
          <button class="badge text-bg-primary edit-btn"  onclick="editTask('${category}', ${index})"><i class="far fa-edit"></i></button>
          <button class="badge text-bg-danger delete-btn "   onclick="deleteTask('${category}', ${index})"><i class="fas fa-trash" ></i></button>
        `;
        listaDeTareas.appendChild(li);
      });

      let completedTasks = tareaPorCategoria[category].filter(function (task) {
        return task.completed;
      }).length;
      let totalTasks = tareaPorCategoria[category].length;
      let completedText = document.createElement('p');
      completedText.textContent = `Tienes: (${completedTasks}) tareas completadas de (${totalTasks}) en total `;
      completedText.classList.add('completed-text');
      listaDeTareas.appendChild(completedText);
    }

    function addTask() {
      let taskText = tareaInput.value.trim();
      let category = seleccionarCategoria.value;
      if (taskText !== '') {
        tareaPorCategoria[category].push({ text: taskText, completed: false });
        guardarTareas(tareaPorCategoria);
        renderTareas(category);
        tareaInput.value = '';
      }else {
          alert('Por favor, ingrese una tarea válida.');
      }
    }

   

    window.deleteTask = function (category, index) {
      tareaPorCategoria[category].splice(index, 1);
      guardarTareas(tareaPorCategoria);
      renderTareas(category);
    };

    window.editTask = function (category, index) {
      let newText = prompt('Ingrese la nueva descripción de la tarea');
      if (newText !== null) {
        tareaPorCategoria[category][index].text = newText;
        guardarTareas(tareaPorCategoria);
        renderTareas(category);
      }
    };

    function toggleTaskCompletion(event) {
      let index = event.target.id.replace('task', '');
      let category = seleccionarCategoria.value;
      tareaPorCategoria[category][index].completed = event.target.checked;
      guardarTareas(tareaPorCategoria);
      renderTareas(category);
    }

    agregarTareaBtn.addEventListener('click', addTask);
    categoriaFiltros.addEventListener('click', function (event) {
      if (event.target.classList.contains('category')) {
        let category = event.target.getAttribute('data-category');
        renderTareas(category);
      }
    });

    listaDeTareas.addEventListener('change', toggleTaskCompletion);




    function filtrarTareas(category) {
      categoriaFiltros.querySelectorAll('.category').forEach(function (element) {
        element.classList.remove('selected');
      });
      categoriaFiltros.querySelector(`[data-category="${category}"]`).classList.add('selected');

      if (category === 'all') {
        renderTodasLasTareas();
      } else {
        renderTareas(category);
      }
    }

    function renderTodasLasTareas() {
      listaDeTareas.innerHTML = '';
      Object.keys(tareaPorCategoria).forEach(function (category) {
        tareaPorCategoria[category].forEach(function (task) {
          let li = document.createElement('li');
          li.innerHTML = `
            <span>${task.text} (${category})</span>
            <button class="badge text-bg-danger delete-btn" onclick="deleteTask('${category}', ${tareaPorCategoria[category].indexOf(task)})"><i class="fas fa-trash"></i></button>`;
          listaDeTareas.appendChild(li);
        });
      });
    }

    agregarTareaBtn.addEventListener('click', addTask);

    categoriaFiltros.addEventListener('click', function (event) {
      if (event.target.classList.contains('category')) {
        filtrarTareas(event.target.getAttribute('data-category'));
      }
    });


    renderTodasLasTareas();
  });
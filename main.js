const apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=3871336&appid=60130eaeddb1c426eb847d008f0af976`;

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const weatherElement = document.getElementById("weather");
    const { main, description } = data.weather[0];
    const { temp, feels_like } = data.main;
    const cityName = data.name;
    weatherElement.innerHTML = `<span class="badge text-bg-success">Ciudad: ${cityName}</span>
     <span class="badge text-bg-warning">Temperature: ${temp}°C</span>`;
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

function guardarTareas(tareaPorCategoria) {
  localStorage.setItem("tareaPorCategoria", JSON.stringify(tareaPorCategoria));
}

function cargarTareas() {
  return (
    JSON.parse(localStorage.getItem("tareaPorCategoria")) || {
      personal: [],
      trabajo: [],
      estudio: [],
    }
  );
}

document.addEventListener("DOMContentLoaded", function () {
  const tareaInput = document.getElementById("tareaInput");
  const seleccionarCategoria = document.getElementById("seleccionarCategoria");
  const agregarTareaBtn = document.getElementById("agregarTareaBtn");
  const listaDeTareas = document.getElementById("listaDeTareas");
  const categoriaFiltros = document.getElementById("categoriaFiltros");

  let tareaPorCategoria = cargarTareas();

  function renderTareas(category) {
    listaDeTareas.innerHTML = "";
    tareaPorCategoria[category].forEach(function (task, index) {
      let li = document.createElement("li");

      li.innerHTML = `
  

          <input class="form-check-input" type="checkbox" id="task${index}" ${
        task.completed ? "checked" : ""
      }>
          <div class="col-8 text-start contenedor-label">
          <label  for="task${index}" class="${
        task.completed ? "task-completed" : ""
      }">${task.text}</label>
          </div>
          <button class=" text-bg-primary edit-btn tooltip-container "  onclick="editTask('${category}', ${index})" ><i class="far fa-edit  "></i> <span class="shadow tooltip-text">Editar</span></button>
          <button class="text-bg-danger delete-btn tooltip-container "   onclick="eliminarTarea('${category}', ${index})"><i class="fas fa-trash" ></i><span class="shadow tooltip-text">Eliminar</span></button>
  
     
        `;

      listaDeTareas.appendChild(li);
    });

    let tareasCompletadas = tareaPorCategoria[category].filter(function (task) {
      return task.completed;
    }).length;
    let totalTareas = tareaPorCategoria[category].length;
    let completedText = document.createElement("p");
    completedText.innerHTML = ` <p class="text-secondary">Tienes: <strong class="text-primary">(${tareasCompletadas})</strong> tareas completadas de <strong class="text-primary">(${totalTareas})</strong> en total </p>  `;

    completedText.classList.add("completed-text");
    listaDeTareas.appendChild(completedText);
  }

  function agregarTarea() {
    let taskText = tareaInput.value.trim();
    let category = seleccionarCategoria.value;
    if (taskText !== "") {
      tareaPorCategoria[category].push({ text: taskText, completed: false });
      guardarTareas(tareaPorCategoria);
      renderTareas(category);
      tareaInput.value = "";
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, ingrese una tarea válida.",
      });
    }
  }

  

  window.eliminarTarea = function (category, index, task) {
    // Elimina la tarea del arreglo de tareas en la categoría especificada
   
    tareaPorCategoria[category].splice(index, 1);
 
    
    // Guarda las tareas actualizadas
    guardarTareas(tareaPorCategoria);
    
    // Renderiza las tareas nuevamente en la interfaz
    renderTareas(category);
    
  
    // Muestra una alerta de confirmación utilizando SweetAlert
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Se eliminará la tarea "${task}" en la categoría "${category}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, muestra una alerta de éxito
        Swal.fire({
          title: "Eliminado",
          text: `La tarea "${task}" ha sido eliminada`,
          icon: "success",
        });
      }
    });
  };
  



 

  window.editTask = function (category, index) {
    Swal.fire({
      title: "Editar tarea",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (newText) => {
        if (newText !== null && newText.trim() !== "") {
          tareaPorCategoria[category][index].text = newText;
          guardarTareas(tareaPorCategoria);
          renderTareas(category);
        } else {
          alert("Por favor, ingrese una tarea válida antes de continuar.");
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  function toggleTaskCompletion(event) {
    let index = event.target.id.replace("task", "");
    let category = seleccionarCategoria.value;
    tareaPorCategoria[category][index].completed = event.target.checked;
    guardarTareas(tareaPorCategoria);
    renderTareas(category);
  }

  agregarTareaBtn.addEventListener("click", agregarTarea);
  categoriaFiltros.addEventListener("click", function (event) {
    if (event.target.classList.contains("category")) {
      let category = event.target.getAttribute("data-category");
      renderTareas(category);
    }
  });

  listaDeTareas.addEventListener("change", toggleTaskCompletion);

  function filtrarTareas(category) {
    categoriaFiltros.querySelectorAll(".category").forEach(function (element) {
      element.classList.remove("selected");
    });
    categoriaFiltros
      .querySelector(`[data-category="${category}"]`)
      .classList.add("selected");

    if (category === "all") {
      renderTodasLasTareas();
    } else {
      renderTareas(category);
    }
  }

  function renderTodasLasTareas() {
    listaDeTareas.innerHTML = "";
    Object.keys(tareaPorCategoria).forEach(function (category) {
      tareaPorCategoria[category].forEach(function (task) {
        let li = document.createElement("li");
        li.innerHTML = `
     
            <span  >${
              task.text
            } <span class="badge badge-category ">${category}</span> </span>
            <button class="text-bg-danger delete-btn tooltip-container" onclick="eliminarTarea('${category}', ${tareaPorCategoria[
          category
        ].indexOf(
          task
        )})"><i class="fas fa-trash"></i><span class="shadow tooltip-text">Eliminar</button>
            
              `;

        listaDeTareas.appendChild(li);
      });
    });
  }

  agregarTareaBtn.addEventListener("click", agregarTarea);

  categoriaFiltros.addEventListener("click", function (event) {
    if (event.target.classList.contains("category")) {
      filtrarTareas(event.target.getAttribute("data-category"));
    }
  });

  function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    const timeString = `${hours}:${minutes}`;
    document.getElementById("time").innerText = timeString;
  }

  setInterval(updateTime, 1000);

  function showDate() {
    const now = new Date();
    const days = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    const dayOfWeek = days[now.getDay()];
    const dayOfMonth = now.getDate();
    const month = months[now.getMonth()];

    const dateString = `${dayOfWeek}, ${dayOfMonth} ${month}`;
    document.getElementById("date").innerText = dateString;
  }

  showDate();

  renderTodasLasTareas();
});

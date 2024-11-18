let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
let contador = parseInt(localStorage.getItem("contador")) || 1;

fetch('./tareasApi.json') // Asegúrate de que el archivo esté al nivel de index.html
    .then(response => response.json())
    .then(data => {
        const nuevasTareas = data.map(tarea => ({
            id: tarea.id,
            descripcion: tarea.text,
            completada: tarea.check,
        }));

        nuevasTareas.forEach(nuevaTarea => {
            if (!tareas.some(tarea => tarea.id === nuevaTarea.id)) {
                tareas.push(nuevaTarea);
            }
        });

        guardarTareas();
        actualizarListaDeTareas();
    })
    .catch(error => console.error('Error al cargar tareas desde el JSON:', error));

//FUNCION PARA AGREGAR NUEVAS TAREAS
function agregarTarea() {
    const inputTarea = document.getElementById("nuevaTarea").value.trim();

    if (inputTarea === "") {
        Toastify({
            text: "No puedes agregar una tarea VACÍA!",
            backgroundColor: "linear-gradient(90deg, rgba(47,0,0,1) 0%, rgba(121,9,9,1) 35%, rgba(214,71,5,1) 100%)" ,
            duration: 2000
            }).showToast();
        return;
    }

    const nuevaTarea = {
        id: contador++,
        descripcion: inputTarea,
        completada: false
    };

    tareas.push(nuevaTarea);
    guardarTareas();
    actualizarListaDeTareas();
    document.getElementById("nuevaTarea").value = "";

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        background: "linear-gradient(328deg, rgba(18,113,2,1) 0%, rgba(77,121,9,1) 35%, rgba(0,0,0,1) 100%)",
        color:"white",
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Tarea agregada correctamente!"
      });
}

//FUNCION PARA ACTUALIZAR AMBAS LISTAS
function actualizarListaDeTareas() {
    const listaDeTareas = document.getElementById("listaDeTareas");
    const tareasFinalizadas = document.getElementById("tareasFinalizadas");
    const botonBorrarTodo = document.getElementById("borrarTodo");

    listaDeTareas.innerHTML = "";
    tareasFinalizadas.innerHTML = "";

    tareas.forEach((tarea, index) => {
        const li = crearElementoTarea(tarea, index);

        if (tarea.completada) {
            tareasFinalizadas.appendChild(li);
        } else {
            listaDeTareas.appendChild(li);
        }
    });
    //BLOQUEA O DESBLOQUEA EL BOTON BORRAR TODO
    if (tareas.length === 0) {
        botonBorrarTodo.disabled = true;
    } else {
        botonBorrarTodo.disabled = false;
    }
}

//FUNCION PARA CREAR TAREA CON FORMATO
function crearElementoTarea(tarea, index) {
    const todoId = `tarea-${index}`;
    const li = document.createElement("li");
    li.className = "todo";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = todoId;

    if (tarea.completada) {
        checkbox.checked = true;
    }

    const labelCheckbox = document.createElement("label");
    labelCheckbox.className = "custom-checkbox";
    labelCheckbox.setAttribute("for", todoId);
    labelCheckbox.innerHTML = `
        <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
        </svg>
    `;

    const labelTexto = document.createElement("label");
    labelTexto.className = "todo-text";
    labelTexto.setAttribute("for", todoId);
    labelTexto.textContent = tarea.descripcion;
   
    const botonEliminar = document.createElement("button");
    botonEliminar.className = "delete-button";
    botonEliminar.innerHTML = `
        <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
        </svg>
    `;

    checkbox.addEventListener("change", () => moverTarea(tarea.id));
    botonEliminar.addEventListener("click", () => borrarTarea(tarea.id));

    li.appendChild(checkbox);
    li.appendChild(labelCheckbox);
    li.appendChild(labelTexto);
    li.appendChild(botonEliminar);

    return li;
}

// CAMBIA EL ESTADO DE LA TAREA DE PENDIENTE A FINALIZADA
function moverTarea(id) {
    tareas = tareas.map(tarea => {
        if (tarea.id === id) {
            return { ...tarea, completada: !tarea.completada };
        }
        return tarea;
    });

    guardarTareas();
    actualizarListaDeTareas();
}

//FUNCION PARA BORRAR UNA TAREA ESPECIFICA
function borrarTarea(id) {
    
    const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
        });

    swalWithBootstrapButtons.fire({
        background:"linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,0,0,1) 100%)",
        title: "¿Estas seguro?",
        text: "Si borras esta tarea no la podras recuperar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "si, borrala!",
        cancelButtonText: "No, cancela!",
        reverseButtons: true
        }).then((result) => {
    if (result.isConfirmed) {
        tareas = tareas.filter(tarea => tarea.id !== id);
        guardarTareas();
        actualizarListaDeTareas();
        swalWithBootstrapButtons.fire({
        background:"linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(13,193,0,1) 100%)",
        title: "Borrado!",
        text: "Su tarea fue borrada!",
        icon: "success"
        });
    } else if (
        result.dismiss === Swal.DismissReason.cancel
    ) {
        swalWithBootstrapButtons.fire({
        background:"linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,0,0,1) 100%)",
        title: "Cancelled",
        text: "Su archivo NO fue borrado",
        icon: "error"
        });
    }
    });
}

//FUNCION PARA BORRAR TODO
function borrarTodo() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "¿Estas seguro?",
        text: "Si decides borrar todo, tambien se eliminara del localstorage ¿Seguro quieres eso?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "si, borrala!",
        cancelButtonText: "No, cancela!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            tareas = [];
            contador = 1;
            localStorage.removeItem("tareas");
            localStorage.removeItem("contador");
            actualizarListaDeTareas();
          swalWithBootstrapButtons.fire({
            title: "Borrado!",
            text: "Su tarea fue borrada!",
            icon: "success"
          });
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "Su archivo NO fue borrado",
            icon: "error"
          });
        }
      });   
}

//FUNCION PARA GUARDAR EN LOCAL STORAGE
function guardarTareas() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
    localStorage.setItem("contador", contador);
}

//COMANDO PARA AGREGAR UNA TAREA AL PRESIONAR ENTER
document.getElementById("nuevaTarea").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        agregarTarea();
    }
});

//COMANDO PARA BORRAR TODO
document.getElementById("borrarTodo").addEventListener("click", borrarTodo);

//PARA MOSTRAR LAS LISTAS AL ACTUALIZAR
actualizarListaDeTareas();
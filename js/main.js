let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
let contador = parseInt(localStorage.getItem("contador")) || 1;

//FUNCION PARA AGREGAR NUEVAS TAREAS
function agregarTarea() {
    const inputTarea = document.getElementById("nuevaTarea").value.trim();

    if (inputTarea === "") {
        alert("No puedes agregar una tarea VACÍA.");
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
    const confirmacion = confirm("¿Estás seguro de eliminar esta tarea?");
    if (confirmacion) {
        tareas = tareas.filter(tarea => tarea.id !== id);
        guardarTareas();
        actualizarListaDeTareas();
    }
}

//FUNCION PARA BORRAR TODO
function borrarTodo() {
    const confirmacion = confirm("¿Estás seguro de eliminar todas las tareas?");
    if (confirmacion) {
        tareas = [];
        contador = 1;
        localStorage.removeItem("tareas");
        localStorage.removeItem("contador");
        actualizarListaDeTareas();
    }
}

//FUNCION PARA GUARDAR EN LOCAL STORAGE
function guardarTareas() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
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
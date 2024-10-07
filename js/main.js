//Mensaje de Bienvenida.
alert('Bienvenido a la Todo-List. Vamos a estar trabajando con mensajes y con la consola.');

//Declaración de variables
let tareas= ['estudiar','entrenar','comprar pan'];
let opcion;
let posicion;

//Funciones
function verTarea(){
    if (tareas.length===0){
        alert("No tienes tareas pendientes.");
    } else {
        console.log(tareas);
    }
}
function agregarTarea(){
    let nuevaTarea=prompt('Agregar tarea nueva: ');
            if(nuevaTarea){
                nuevaTarea=nuevaTarea.toLowerCase();
                tareas.push(nuevaTarea);
                alert('Se añadio ' + nuevaTarea + ' correctamente.');
                console.log(tareas);
            } else{
                alert('No se agrego ninguna tarea.');
            }
}
function borrarTarea(){
    if (tareas.length===0){
        alert("No hay tareas para eliminar.");
    } else{
        console.log(tareas);//la idea de este console es para ver las tareas que hay y poder elegir cual deseo borrar.
        let borrarTarea=prompt('¿Que tarea deseas eliminar?');

        if(borrarTarea){
            borrarTarea=borrarTarea.toLowerCase();
            posicion=tareas.indexOf(borrarTarea);//busco lo ingresado para borrar dentro del array tareas con indexOf y devuelvo la posicion del dato a borrar.
            
            if (posicion === -1){
                alert('No se encuentra dicha tarea!');
            } else{
                let confirmacion=confirm('¿Estas seguro que deseas borrar la tarea: '+borrarTarea+' ?');
                if (confirmacion){
                tareas.splice(posicion,1);
                alert('La tarea '+ borrarTarea +' ha sido borrada.');
                console.log(tareas);
                }else{
                    alert('La tarea no ha sido borrada.');
                }
            }
        } else {
            alert('No seleccionaste ninguna tarea para borrar!');
        }
    }
}

do{
    opcion=prompt('Elige una opción del Menú:\n1 - Ver Tareas\n2 - Agregar Tareas\n3 - Borrar Tarea\n0 - Salir');

    switch(opcion){
        case '1':
            verTarea();
            break;

        case '2':
            agregarTarea();
            break;

        case '3':
            borrarTarea();
            break;          

        case '0':
            alert('Saliendo....');
            break;

        default:
            alert('Opción no valida. Por favor ingrese una opción entre 0, 1, 2 y 3.');
    }
} while (opcion !=='0');

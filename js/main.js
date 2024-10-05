alert('Hola Bienvenido a la Todo-List. Vamos a estar trabajando con mensajes y con la consola.');

let tareas= ['estudiar','entrenar','comprar pan'];
let opcion;
let posicion;

do{
    opcion=prompt('Presione 1 para ver las tareas, presione 2 para agregar una tarea, presione 3 para eliminar una tarea o presione 0 para salir del programa.');

    switch(opcion){
        case '1':
            if (tareas.length===0){
                alert("No tienes tareas pendientes.");
            } else {
                console.log(tareas);
            }
            break;

        case '2':
            let nuevaTarea=prompt('Agregar tarea nueva: ');
            if(nuevaTarea){
                nuevaTarea=nuevaTarea.toLowerCase();
                tareas.push(nuevaTarea);
                alert('Se añadio ' + nuevaTarea + ' correctamente.');
                console.log(tareas);
            } else{
                alert('No se agrego ninguna tarea.');
            }
            break;

        case '3':
            if (tareas.length===0){
                alert("No hay tareas para eliminar.");
            } else{
                console.log(tareas);
                let borrarTarea=prompt('¿Que tarea deseas eliminar?');

                if(borrarTarea){
                    borrarTarea=borrarTarea.toLowerCase();
                    posicion=tareas.indexOf(borrarTarea);
                    
                    if (posicion === -1){
                        alert('No se encuentra dicha tarea!');
                    } else{
                        tareas.splice(posicion,1);
                        alert('La tarea '+ borrarTarea +' ha sido borrada.');
                        console.log(tareas);
                    }
                } else {
                    alert('No seleccionaste ninguna tarea para borrar!');
                }
            }
            break;          

        case '0':
            alert('¡Gracias por usar la Todo-list!');
            break;

        default:
            alert('Opción no valida. Por favor ingrese una opción entre 0, 1, 2 y 3.');
    }
} while (opcion !=='0');

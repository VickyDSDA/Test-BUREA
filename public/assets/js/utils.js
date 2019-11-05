//Funcion para obtener todas las tareas
;
(function() {

    fetch('/tareas', {
            method: 'GET'
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log('Success:', response);
            var backlogs = $('#backlogs');
            var toDo = $('#toDo');
            var ongoing = $('#ongoing');
            var done = $('#done');
            var modalEliminar = $('#modal-eliminar');
            var modalEditar = $('#modal-editar');
            var html = '';
            if (!response.tareas) {
                console.log("No hay tareas");
            } else {
                for (let i = 0; i < response.tareas.length; i++) {
                    html += `<div class="card cards-tareas" id="${response.tareas[i]["_id"]}" draggable="true" ondragstart="drag(event)" ondragend="dragend(event)">`;
                    if (response.tareas[i].prioridad === 'Alta') {
                        html += `<div class="card-header text-white bg-warning" id="tarea-titulo">${response.tareas[i].titulo}</div>`;
                    }
                    if (response.tareas[i].prioridad === 'Mediana') {
                        html += `<div class="card-header text-white bg-success" id="tarea-titulo">${response.tareas[i].titulo}</div>`;
                    }
                    if (response.tareas[i].prioridad === 'Baja') {
                        html += `<div class="card-header text-white bg-secondary" id="tarea-titulo">${response.tareas[i].titulo}</div>`;
                    }
                    html += `<div class="card-body">`;
                    html += `    <p class="card-text" id="tarea-descripcion">${response.tareas[i].descripcion}</p>`;
                    html += `    <h6 class="card-subtitle mb-2" id="tarea-encargado">Encargado: ${response.tareas[i].encargado}</h6>`;
                    html += `<hr/>`;
                    html += `    <a href='#' class="card-link btn btn-danger eliminar-tarea" >Eliminar</button>`;
                    html += `    <a href='#' class="card-link btn btn-secondary editar-tarea" >Editar</a>`;
                    html += `</div>`;
                    if (response.tareas[i].estado === 'backlogs') {
                        backlogs.append(html);
                        html = '';
                    }
                    if (response.tareas[i].estado === 'toDo') {
                        toDo.append(html);
                        html = '';
                    }
                    if (response.tareas[i].estado === 'ongoing') {
                        ongoing.append(html);
                        html = '';
                    }
                    if (response.tareas[i].estado === 'done') {
                        done.append(html);
                        html = '';
                    }
                }

                $('.editar-tarea').click(function(event) {
                    event.preventDefault();
                    var idTarea = event.currentTarget.parentNode.parentNode.id;
                    localStorage.setItem('idtarea', idTarea);
                    fetch(`/tareas/${idTarea}`, {
                            method: 'GET',
                        }).then(res => res.json())
                        .catch(error => console.error('Error en fetch: ', error))
                        .then(response => {
                            console.log(response);
                            $('#titulo-editar').val(response.tarea.titulo);
                            $('#descripcion-editar').val(response.tarea.descripcion);
                            $('#prioridad-editar').val(response.tarea.prioridad);
                            var fechaEdit = response.tarea.fecha.split("T");
                            $('#fecha-editar').val(fechaEdit[0]);
                            $('#encargado-editar').val(response.tarea.encargado);

                            modalEditar.modal('show');
                        });
                });

                $('.eliminar-tarea').click(function(event) {
                    event.preventDefault();
                    var idTarea = event.currentTarget.parentNode.parentNode.id;
                    localStorage.setItem('idtarea', idTarea);
                    modalEliminar.modal('show');
                });
            }
        });
})();
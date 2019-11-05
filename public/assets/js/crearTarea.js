var formCrear = $('#crear_tarea');
formCrear.on('submit', function(event) {
    event.preventDefault();
    let data = {
        titulo: $('#titulo').val(),
        descripcion: $('#descripcion').val(),
        prioridad: $('#prioridad').val(),
        fecha: $('#fecha').val(),
        encargado: $('#encargado').val()
    }

    fetch('/tareas', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log('Success:', response);
            var backlogs = $('#backlogs');
            var modalEliminar = $('#modal-eliminar');
            var modalEditar = $('#modal-editar');
            var html = '';
            html += `<div class="card cards-tareas" id="${response.tarea["_id"]}" draggable="true" ondragstart="drag(event)" ondragend="dragend(event)">`;
            if (response.tarea.prioridad === 'Alta') {
                html += `<div class="card-header text-white bg-warning" id="tarea-titulo">${response.tarea.titulo}</div>`;
            }
            if (response.tarea.prioridad === 'Mediana') {
                html += `<div class="card-header text-white bg-success" id="tarea-titulo">${response.tarea.titulo}</div>`;
            }
            if (response.tarea.prioridad === 'Baja') {
                html += `<div class="card-header text-white bg-secondary" id="tarea-titulo">${response.tarea.titulo}</div>`;
            }
            html += `<div class="card-body">`;
            html += `    <p class="card-text" id="tarea-descripcion">${response.tarea.descripcion}</p>`;
            html += `    <h6 class="card-subtitle mb-2" id="tarea-encargado">Encargado: ${response.tarea.encargado}</h6>`;
            html += `<hr/>`;
            html += `    <a href="#" class="card-link btn btn-danger eliminar-tarea">Eliminar</a>`;
            html += `    <a href="#" class="card-link btn btn-secondary editar-tarea">Modificar</a>`;
            html += `</div>`;
            if (response.tarea.estado === 'backlogs') {
                backlogs.append(html);
                html = '';
                $('#titulo').val('');
                $('#descripcion').val('');
                $('#prioridad').val('');
                $('#fecha').val('');
                $('#encargado').val('');
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
        });
});
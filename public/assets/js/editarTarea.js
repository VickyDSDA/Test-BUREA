$('#form-editar').on('submit', function(ev) {
    ev.preventDefault();
    var id = localStorage.getItem('idtarea');
    var modalEditar = $('#modal-editar');
    let data = {
        titulo: $('#titulo-editar').val(),
        descripcion: $('#descripcion-editar').val(),
        prioridad: $('#prioridad-editar').val(),
        fecha: $('#fecha-editar').val(),
        encargado: $('#encargado-editar').val()
    }
    fetch(`/tareas/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error en fetch: ', error))
        .then(response => {
            console.log(response);
            var modalEliminar = $('#modal-eliminar');
            var modalEditar = $('#modal-editar');
            var html = '';
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
            html += `    <a href="#" class="card-link btn btn-secondary editar-tarea">Editar</a>`;
            html += `</div>`;
            $(`#${id}`).html(html);
            modalEditar.modal('hide');

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
})
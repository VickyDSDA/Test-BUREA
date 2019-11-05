$('#form-eliminar').on('submit', function(ev) {
    ev.preventDefault();
    var id = localStorage.getItem('idtarea');
    var modalEliminar = $('#modal-eliminar');
    var tarea = $(`#${id}`);
    fetch(`/tareas/${id}`, {
            method: 'DELETE',
        }).then(res => res.json())
        .catch(error => console.error('Error en fetch: ', error))
        .then(response => {
            console.log(response);
            modalEliminar.modal('hide');
            tarea.remove();
        });
})
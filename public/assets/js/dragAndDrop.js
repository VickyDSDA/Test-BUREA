function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("card", ev.target.id);

    var el = document.getElementById(ev.target.id);
    el.classList.add("moviendo");
}

function dragend(ev) {
    var el = document.getElementById(ev.target.id);
    el.classList.remove("moviendo");

    window.setTimeout(function() {
        el.classList.add('movido');
        window.setTimeout(function() {
            el.classList.remove('movido');
        }, 700);
    }, 100);
}

function cambiarEstado(id, estado) {
    var data = {
        estado
    }
    fetch(`/tareas/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error en fetch: ', error))
        .then(response => console.log('Success en fetch: ', response));
}

function drop(ev) {
    ev.preventDefault();

    if (!ev.target.getAttribute("ondrop")) {
        ev.dataTransfer.clearData();
        return false;
    }

    var data = ev.dataTransfer.getData("card");
    cambiarEstado(data, ev.target.id); // data es el id de la tarea, ev.target.id es el id de la columna a donde lo vas a mover
    ev.target.appendChild(document.getElementById(data));
    ev.dataTransfer.clearData();
}
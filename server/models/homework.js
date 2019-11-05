const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let prioridadValida = {
    values: ['Alta', 'Mediana', 'Baja'],
    message: '{VALUE} no es una prioridad válida'
};

let estadoValido = {
    values: ['backlogs', 'toDo', 'ongoing', 'done'],
    message: '{VALUE} no es un estado válido'
}
let homeworkSchema = new Schema({
    titulo: {
        type: String,
        required: [true, 'El título es necesario']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es necesaria']
    },
    prioridad: {
        type: String,
        required: [true, 'La prioridad es necesaria'],
        enum: prioridadValida
    },
    fecha: {
        type: Date,
        required: [true, 'Es necesario indicar la fecha a completarse la tarea']
    },
    encargado: {
        type: String,
        required: [true, 'Es necesario indicar el encargado de completar la tarea']
    },
    estado: {
        type: String,
        required: [true, 'Es necesario indicar el estado de la tarea'],
        default: 'backlogs',
        enum: estadoValido
    }
});

module.exports = mongoose.model('Tarea', homeworkSchema);
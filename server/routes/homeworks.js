const express = require('express');
const app = express();

const Tarea = require('../models/homework');

//Obtener todas las tareas
app.get('/tareas', (req, res) => {

    Tarea.find()
        .exec((err, tareas) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                tareas,
            });

        });
});

//Obtener una tarea segun un id
app.get('/tareas/:id', (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Tarea.findById(id, body, { new: true, runValidators: true, context: 'query' }, (err, tareaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            tarea: tareaDB
        });
    });
});

//Crear Tarea
app.post('/tareas', (req, res) => {

    let body = req.body;

    let tarea = new Tarea({
        titulo: body.titulo,
        descripcion: body.descripcion,
        prioridad: body.prioridad,
        fecha: body.fecha,
        encargado: body.encargado,
    });

    tarea.save((err, tareaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            tarea: tareaDB
        });

    });

});

app.put('/tareas/:id', (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Tarea.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, tareaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!tareaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            tarea: tareaDB
        });
    });
});

app.delete('/tareas/:id', (req, res) => {

    let id = req.params.id;
    Tarea.findByIdAndRemove(id, (err, tareaBorrada) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!tareaBorrada) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Tarea no encontrada'
                }
            });
        }
        res.json({
            ok: true,
            message: 'Tarea borrada',
            tareaBorrada
        });
    });
});

module.exports = app;
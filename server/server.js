const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');
// parse aplication/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/homeworks.js'));

app.use(express.static(path.resolve(__dirname, '../public')));

mongoose.connect('mongodb://localhost:27017/DB_TestBUREA', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err) throw err;
    console.log('Base de datos online');
});

app.listen(3000, () => {
    console.log('Escuchando puerto:', 3000);
});
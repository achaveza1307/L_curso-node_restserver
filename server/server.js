require('./config/config')

const express = require('express')
const app = express()

const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.json('Expecting...');
});

app.get('/usuario', function(req, res) {
    res.json('get Usuario (OK)');
});

app.post('/usuario', function(req, res) {

    let body = req.body;

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: "El nombre debe existir"
        });

    } else {
        res.json({
            persona: body
        });
    }

});

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;

    res.json({
        id
    });
});

app.delete('/usuario', function(req, res) {
    res.json('delete Usuario (OK)');
});

app.listen(process.env.PORT, () => {
    console.log("Recibiendo desde el puerto: ", process.env.PORT);
});
const express = require('express');
const { verificaToken } = require('../middlewares/autenticacion');

let app = express();

let Producto = require('../models/producto');

// Otener productos
app.get('/producto', verificaToken, (req, res) => {
    // Muestra todos los productos disponibles populando usuario y categoria  ---  Paginado

    let desde = req.query.desde || 0;
    desde = Number(desde);

    Producto.find({ disponible: true })
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos: productoDB
            });
        });

});

// Otener un producto dado el id
app.get('/producto/:id', verificaToken, (req, res) => {
    // Muestra un producto populando usuario y categoria
    let id = req.params.id;

    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: `No existe ningun producto con el identificador ${id}`
                    }
                });
            }

            res.json({
                ok: true,
                producto: productoDB
            });
        });

});

// Crear un producto
app.post('/producto', verificaToken, (req, res) => {

    // Grabar el usuario
    // Grabar una categoria del listado
    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precio,
        descripcion: body.descripcion,
        categoria: body.categoria,
        usuario: req.usuario._id
    });

    producto.save((err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'No se agregó el producto a la Base de Datos'
                }
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });

    });

});

// Actualizar informacion de un producto dado el id
app.put('/producto/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Producto.findById(id, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: `No existe el producto con identificador ${id}`
                }
            });
        }

        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precio;
        productoDB.descripcion = body.descripcion;
        productoDB.categoria = body.categoria;
        productoDB.disponible = body.disponible;

        productoDB.save((err, productoAct) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoAct
            });

        });

    });

});

// Cambiar disponibilidad de un producto
app.delete('/producto/:id', verificaToken, (req, res) => {
    // Poner el atributo "disponible" en falso
    let id = req.params.id;

    let cambiaDisponibilidad = {
        disponible: false
    };

    Producto.findByIdAndUpdate(id, cambiaDisponibilidad, { new: true }, (err, productoNoDisp) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: `No existe el producto con identificador ${id}`
                }
            });
        }

        res.json({
            ok: true,
            producto: productoNoDisp
        });

    });

});

// Realizar busqueda de productos en la Base de datos
app.get('/producto/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let expReg = new RegExp(termino, 'i');

    Producto.find({ disponible: true, nombre: expReg })
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            });
        });

});



module.exports = app;
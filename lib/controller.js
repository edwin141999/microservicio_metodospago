const express = require('express');
const router = express.Router()
const { get } = require('./tarjetas_service');

router.get('/getTarjetas', getTarjetas)

function getTarjetas(req, res, next) {
  get().then(tarjetas => tarjetas
    ? res.json(tarjetas)
    : res.status(404).json({ message: 'No hay Tarjetas' })
  )
}

module.exports = router;
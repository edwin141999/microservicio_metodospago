const express = require('express');
const router = express.Router()
const { createCard, updateCard, deleteCard, getCardsClient, getOneCardClient } = require('./tarjetas_service');

router.post('/getTarjetas', getTarjetas)
router.post('/getTarjeta', getUnaTarjeta)
router.post('/createTarjeta', createTarjeta)
router.put('/updateTarjeta', updateTarjeta)
router.delete('/deleteTarjeta', deleteTarjeta)

function getTarjetas(req, res, next) {
  getCardsClient(req.body).then(tarjetas => tarjetas
    ? res.json(tarjetas)
    : res.status(404).json({ message: 'No hay Tarjetas' })
  )
    .catch(err => next(err))
}

function getUnaTarjeta(req, res, next) {
  getOneCardClient(req.body).then(tarjeta => tarjeta
    ? res.json(tarjeta)
    : res.status(404).json({ message: 'No hay Tarjeta' })
  )
    .catch(err => next(err))
}

function createTarjeta(req, res, next) {
  createCard(req.body).then(tarjeta => tarjeta
    ? res.json(tarjeta)
    : res.status(404).json({ message: 'No se puede crear la Tarjeta' })
  )
    .catch(err => next(err))
}

function updateTarjeta(req, res, next) {
  updateCard(req.body).then(tarjeta => tarjeta
    ? res.json(tarjeta)
    : res.status(404).json({ message: 'No se puede actualizar la Tarjeta' })
  )
    .catch(err => next(err))
}

function deleteTarjeta(req, res, next) {
  deleteCard(req.body).then(tarjeta => tarjeta
    ? res.json(tarjeta)
    : res.status(404).json({ message: 'No se puede eliminar la Tarjeta' })
  )
    .catch(err => next(err))
}

module.exports = router;
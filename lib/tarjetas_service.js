const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const base64 = require('base-64');
const utf8 = require('utf8');

module.exports = { getCardsClient, createCard, updateCard, deleteCard, getOneCardClient }

async function getCardsClient(params) {
  const { user_id } = params
  const allCards = await prisma.tipopago.findMany()
  const cardsUser = allCards.filter(card => card.user_id === user_id)
  return { tarjetas: cardsUser }
}

async function getOneCardClient(params) {
  const { id } = params
  const card = await prisma.tipopago.findUnique({ where: { id: id } })
  return { tarjeta: card }
}

async function createCard(params) {
  const { user_id, cvv, month_expiracion, nombre_tarjeta, numero_tarjeta, year_expiracion, nombre_banco } = params
  const result = await prisma.tipopago.create({
    data: {
      user_id: user_id,
      metodo: 'Debito',
      nombre_tarjeta: nombre_tarjeta,
      numero_tarjeta: base64.encode(utf8.encode(numero_tarjeta)),
      year_expiracion: base64.encode(utf8.encode(year_expiracion)),
      month_expiracion: base64.encode(utf8.encode(month_expiracion)),
      cvv: base64.encode(utf8.encode(cvv)),
      nombre_banco: base64.encode(utf8.encode(nombre_banco))
    }
    // "user_id": 1,
    // "cvv": "123",
    // "month_expiracion": "5",
    // "nombre_tarjeta": "Edwin Davila Astudillo",
    // "numero_tarjeta": "1234567898765432",
    // "year_expiracion": "2025",
    // "nombre_banco": "Banamex"
  })
  return { tarjeta: result }
}

async function updateCard(params) {
  const { id, nombre_tarjeta, year_expiracion, month_expiracion } = params
  const result = await prisma.tipopago.update({
    where: {
      id: id
    },
    data: {
      nombre_tarjeta: nombre_tarjeta,
      year_expiracion: base64.encode(utf8.encode(year_expiracion)),
      month_expiracion: base64.encode(utf8.encode(month_expiracion))
    }
    // "id": 4,
    // "nombre_tarjeta": "Edwin Astudillo de Coss",
    // "year_expiracion": "2026",
    // "month_expiracion": "12"
  })
  return { tarjeta: result }
}

async function deleteCard(params) {
  const { id } = params
  await prisma.tipopago.delete({ where: { id: id } })
  return { tarjeta: 'La tarjeta ha sido eliminada' }
}
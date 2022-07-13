const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = { get }

async function get() {
  const result = await prisma.tipopago.findMany()
  return { tarjetas: result }
}
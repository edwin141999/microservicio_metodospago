const config = require('../config.json')
const jwt = require('jsonwebtoken')

module.exports = authMiddleware

async function authMiddleware(req, res, next) {

  if (req.path === '/users/getTarjetas') return next()
  if (req.path === '/users/getTarjeta') return next()
  if (req.path === '/users/createTarjeta') return next()
  if (req.path === '/users/updateTarjeta') return next()
  if (req.path === '/users/deleteTarjeta') return next()

  const token = req.headers['x-access-token'] ||
    (req.headers.authorization && req.headers.authorization.indexOf('Bearer ') != -1 && req.headers.authorization.split(' ')[1])

  if (!token) {
    return res.status(403).send({
      "error": true,
      "message": 'No token provided.'
    })
  }

  jwt.verify(token, config.privateKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        "error": true,
        "name": err.name ? err.name : "Token verification failed",
        "message": err.message ? err.message : "Token verification failed"
      })
    }
    req.decoded = decoded
    next()
  })
}
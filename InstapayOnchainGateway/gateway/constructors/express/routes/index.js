const path = require('path')
const cors = require('cors')
const router = require('express').Router()
const APIRouter = require('./api')

if (process.env.NODE_ENV === 'development') {
  router.use('/api', cors(), APIRouter)
} else {
  router.use('/api', APIRouter)
}

router.get('/api/*', (req, res) => {
  res.status(404).send()
})

router.get('/health', async (req, res) => {
  return res.status(200).send({ health: 'HEALTHY' })
})

router.get('*', (req, res, next) => {
  if (req.url === '/graphql') return next()
  res.status(200).sendFile(path.join(__dirname, '../../../static/index.html'))
})



module.exports = router

const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

app.get('')

app.get('/', (req, res) => {
  return res.render('age')
})

const checkAgeMiddleware = (req, res, next) => {
  if (req.query.age) {
    return next()
  }
  return res.redirect('/')
}

app.post('/check', (req, res) => {
  const { age } = req.body

  age >= 18
    ? res.redirect(`/major?age=${age}`)
    : res.redirect(`/minor?age=${age}`)
})

app.get('/major', checkAgeMiddleware, (req, res) => {
  return res.render('major', { age: req.query.age })
})

app.get('/minor', checkAgeMiddleware, (req, res) => {
  return res.render('minor', { age: req.query.age })
})

app.listen(3000)

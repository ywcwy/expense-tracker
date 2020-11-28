const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

require('./config/mongoose')

const app = express()
const port = 3000


// 樣版引擎設定
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// setting static files, bodyParse, methodOverride
app.use(express.static('public'), bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)


app.listen(port, () => {
  console.log(`now is on localhost:${port}`)
})

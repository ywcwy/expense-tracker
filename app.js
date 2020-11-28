const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
const port = 3000
const app = express()

// 連線到資料庫
mongoose.connect('mongodb://localhost/expense-list', { useNewUrlParser: true, useUnifiedTopology: true }) //資料庫伺服器內的專案名稱
const db = mongoose.connection //取得資料庫的連線狀態
db.on('error', () => { //連線異常
  console.log('mongodb error!')
})
db.once('open', () => { // 連線成功
  console.log('mongodb connected!')
})

// 樣版引擎設定
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// setting static files, bodyParse, methodOverride
app.use(express.static('public'), bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)


//路由設定






app.listen(port, () => {
  console.log(`now is on localhost:${port}`)
})

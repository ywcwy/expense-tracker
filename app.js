const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Expense = require('./models/record')
const port = 3000
const app = express()

// 連線到資料庫
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true }) //資料庫伺服器內的專案名稱
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
// setting static files
app.use(express.static('public'))

//路由設定
app.get('/', (req, res) => {
  Expense.find()
    .lean()
    .then(expense => res.render('index', { expense, css: 'index.css' }))
    .catch(error => console.log(error))
})

// create
app.get('/expense/new', (req, res) => {
  res.render('new', { css: 'edit.css' })
})

app.listen(port, () => {
  console.log(`now is on localhost:${port}`)
})

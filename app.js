const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Record = require('./models/record')
const Category = require('./models/category')
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
// setting static files
app.use(express.static('public'))

//路由設定
app.get('/', (req, res) => {
  let categoryList = []
  Category.find()
    .lean()
    .then((category) => {
      // categoryList.push(category)
      // console.log(category)
      Record.find()
        .lean()
        .then((record) => { // 在category中尋找符合此record項目的icon
          // console.log(record)
          if (category.find(item => item.categoryName === record.category)) {
            console.log(item)
            record.category = category[category.indexOf(record.category)].icon
            console.log(record.category)
          }
          let totalAmount = 0
          record.forEach(item => {
            totalAmount += item.amount
          })
          res.render('index', { record, totalAmount, css: 'index.css' })
        })

    }).catch(error => console.log(error))
})

// create
app.get('/expense/new', (req, res) => {
  res.render('new', { css: 'edit.css' })
})

app.listen(port, () => {
  console.log(`now is on localhost:${port}`)
})

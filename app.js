const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
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
app.use(express.static('public'), bodyParser.urlencoded({ extended: true }))

//路由設定
app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then((record) => {
      let totalAmount = 0
      record.forEach(item => {
        totalAmount += item.amount
      })
      res.render('index', { record, totalAmount, css: 'index.css' })
    }).catch(error => console.log(error))
})


// create
app.get('/expense/new', (req, res) => { // new page
  return res.render('new', { css: 'edit.css' })
})

app.post('/expense', (req, res) => { // 將 new page 填完的資料 post
  const body = req.body
  const record = new Record({  // 從 Record 產生一個實例
    name: body.name,
    category: body.category,
    icon: body.category,
    date: body.date,
    amount: body.amount
  })
  Category.find({ categoryName: body.category }, (err, categories) => {
    // 從 Category 中尋找相對應的 icon 值
    if (err) {
      return console.error(err)
    }
    categories.forEach(category => {
      console.log(`${category.categoryName} : ${category.icon}`)
      record.icon = category.icon  // 修改實例中的 icon 值
    })
  }).lean()
    .then(() => {
      record.save()  // 將實例存入資料庫
      res.redirect('/')
    }).catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`now is on localhost:${port}`)
})

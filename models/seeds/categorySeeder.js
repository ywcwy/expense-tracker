const mongoose = require('mongoose')
const Category = require('../category')
mongoose.connect('mongodb://localhost/expense-list', { useNewUrlParser: true, useUnifiedTopology: true }) //資料庫伺服器內的專案名稱
const db = mongoose.connection //取得資料庫的連線狀態

db.on('error', () => { //連線異常
  console.log('mongodb error!')

})

db.once('open', () => { // 連線成功
  Category.create({
    categoryName: '家居物業',
    icon: 'fas fa-home'
  }, {
    categoryName: '交通出行',
    icon: 'fas fa-shuttle-van'
  }, {
    categoryName: '休閒娛樂',
    icon: 'fas fa-grin-beam'
  }, {
    categoryName: '餐飲食品',
    icon: 'fas fa-utensils'
  }, {
    categoryName: '其他',
    icon: 'fas fa-pen'
  })
})

const mongoose = require('mongoose')
const Category = require('../category')
mongoose.connect('mongodb://localhost/expense-list', { useNewUrlParser: true, useUnifiedTopology: true }) //資料庫伺服器內的專案名稱
const db = mongoose.connection //取得資料庫的連線狀態

db.on('error', () => { //連線異常
  console.log('mongodb error!')

})

db.once('open', () => { // 連線成功
  console.log('mongodb connected!')
  Category.create({
    categoryName: '家居物業',
    icon: '<i class="fas fa-home"></i>'
  }, {
    categoryName: '交通出行',
    icon: '<i class="fas fa-shuttle-van"></i>'
  }, {
    categoryName: '休閒娛樂',
    icon: '<i class="fas fa-grin-beam"></i>'
  }, {
    categoryName: '餐飲食品',
    icon: '<i class="fas fa-utensils"></i>'
  }, {
    categoryName: '其他',
    icon: '<i class="fas fa-pen"></i>'
  })
})

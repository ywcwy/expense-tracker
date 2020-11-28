const mongoose = require('mongoose')
// 連線到資料庫
mongoose.connect('mongodb://localhost/expense-list', { useNewUrlParser: true, useUnifiedTopology: true }) //資料庫伺服器內的專案名稱
const db = mongoose.connection //取得資料庫的連線狀態
db.on('error', () => { //連線異常
  console.log('mongodb error!')
})
db.once('open', () => { // 連線成功
  console.log('mongodb connected!')
})

module.exports = db
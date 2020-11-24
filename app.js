const express = require('express')
const mongoose = require('mongoose')

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

app.get('/', (req, res) => {
  res.render('index')
})
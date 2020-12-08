const mongoose = require('mongoose')

//引用mongoose的資料庫規劃
const Schema = mongoose.Schema

// 定義資料庫綱要
const recordSchema = new Schema({
  name: {
    type: String
  },
  icon: {
    type: String
  },
  category: {
    type: String
  },
  date: {
    type: String
  },
  amount: {
    type: Number
  }
})

// 把以上schema命名為 Record 模組並匯出
module.exports = mongoose.model('Record', recordSchema) 
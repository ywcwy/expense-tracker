const mongoose = require('mongoose')

//引用mongoose的資料庫規劃
const Schema = mongoose.Schema

// 定義資料庫綱要
const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true
  }
})

// 把以上schema命名為 Record 模組並匯出
module.exports = mongoose.model('Record', recordSchema) 
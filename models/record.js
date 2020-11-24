const mongoose = require('mongoose')

//引用mongoose的資料庫規劃
const Schema = mongoose.Schema

// 定義資料庫綱要
const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Data.now
  },
  amount: {
    type: Number,
    required: true
  }
})

// 匯出record資料模組
module.exports = mongoose.model('Record', recordSchema) 
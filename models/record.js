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
  },
  userId: {
    type: Schema.Types.ObjectId,  // 定義userId 是一個Object Id 會連向另一個資料物件
    ref: 'User', // 定義參考的物件對象是 User model
    index: true, // 把 userId 設定成索引來查詢資料
    required: true
  }
})

// 把以上schema命名為 Record 模組並匯出
module.exports = mongoose.model('Record', recordSchema) 
const mongoose = require('mongoose')

//引用mongoose的資料庫規劃
const Schema = mongoose.Schema

// 定義資料庫綱要
const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },

})

// 把以上schema命名為 Category 模組並匯出
module.exports = mongoose.model('Category', categorySchema) 
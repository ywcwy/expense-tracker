// 引用 express 與 路由器
const express = require('express')
const router = express.Router()
const sum = require('../../public/javascripts/totalAmount')
const Record = require('../../models/record')


// 過濾類別
router.get('/', (req, res) => {
  const icon = req.query.category
  const categories = {
    living: '家居物業',
    transport: '交通出行',
    entertainment: '休閒娛樂',
    food: '餐飲食品',
    others: '其他'
  }
  Record.find({ category: categories[icon] })
    .lean()
    .sort({ date: 'asc' })
    .then((record) => {
      return res.render('index', { record, total: sum(record), css: 'index.css' })
    })
})

// 匯出路由器
module.exports = router
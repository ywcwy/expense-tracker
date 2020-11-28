
// 引用 express 與 路由器
const express = require('express')
const router = express.Router()
const Record = require('../../models/record')


//
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
    .then((record) => {
      let totalAmount = 0
      record.forEach(item => {
        totalAmount += item.amount
      })
      res.render('index', { record, totalAmount, css: 'index.css' })
    })
})



// 匯出路由器
module.exports = router
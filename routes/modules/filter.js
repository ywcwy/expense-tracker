// 引用 express 與 路由器
const express = require('express')
const handlebars = require('handlebars')
const router = express.Router()
const sum = require('../../public/javascripts/totalAmount')
const Record = require('../../models/record')


// 過濾類別
router.get('/', (req, res) => {
  const userId = req.user._id
  const icon = req.query.category
  const month = req.query.month
  const categories = {
    living: '家居物業',
    transport: '交通出行',
    entertainment: '休閒娛樂',
    food: '餐飲食品',
    others: '其他'
  }
  const months = {
    1: '一月',
    2: '二月',
    3: '三月',
    4: '四月',
    5: '五月',
    6: '六月',
    7: '七月',
    8: '八月',
    9: '九月',
    10: '十月',
    11: '十一月',
    12: '十二月',
  }

  if (!icon) { // 沒選擇類別，只選擇月份
    Record.find({ userId })
      .lean()
      .sort({ date: 'asc' })
      .then((record) => {
        record = record.filter(item => item.date.getMonth() + 1 === Number(month))
        return res.render('index', { record, total: sum(record), css: 'index.css', month: months[month] })
      })
  } else if (!month) { // 沒選擇月份，只選擇類別
    Record.find({ category: categories[icon], userId })
      .lean()
      .sort({ date: 'asc' })
      .then((record) => {
        return res.render('index', { record, total: sum(record), css: 'index.css', category: categories[icon] })
      })
  }
})

// 匯出路由器
module.exports = router
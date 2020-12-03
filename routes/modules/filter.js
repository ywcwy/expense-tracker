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
      // let totalAmount = 0
      // let total = 0
      // record.forEach(item => {
      //   totalAmount += item.amount  // 先計算總金額
      //   total = thousandComma(totalAmount)
      //   item.amount = thousandComma(item.amount)
      // })
      return res.render('index', { record, total: sum(record), css: 'index.css' })
    })
})


// 金額格式化：加上千分數逗點
// function thousandComma(number) {
//   let num = number.toString() // 金額先轉為字串
//   const pattern = /(-?\d+)(\d{3})/  // 字串中，如果末三位為數字，且前面有一個或多個數字，就會適用此模式
//   while (pattern.test(num)) { //使用迴圈以三位數、三位數的方式一直測試，直到不符合上述，回傳false 離開迴圈
//     num = num.replace(pattern, "$1,$2")
//   }
//   return num //回傳加上逗點後的數字
// }

// 匯出路由器
module.exports = router
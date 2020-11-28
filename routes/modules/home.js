
// 引用 express 與 路由器
const express = require('express')
const router = express.Router()
const Record = require('../../models/record')


//  引入路由模模組
router.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ date: 'asc' })
    .then((record) => {
      let totalAmount = 0
      let total = 0
      record.forEach(item => {
        totalAmount += item.amount  // 先計算總金額
        total = thousandComma(totalAmount)
        item.amount = thousandComma(item.amount)
      })
      res.render('index', { record, total, css: 'index.css' })
    }).catch(error => console.log(error))
})

// 金額格式化：加上千分數逗點
function thousandComma(number) {
  var num = number.toString();
  var pattern = /(-?\d+)(\d{3})/;  // 字串中，如果末三位為數字，且前面有一個或多個數字，就會適用此模式
  while (pattern.test(num)) { //使用迴圈以三位數、三位數的方式一直測試，直到不符合上述，回傳false 離開迴圈
    num = num.replace(pattern, "$1,$2");
  }
  return num;
}

// 匯出路由器
module.exports = router
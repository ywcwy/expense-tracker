
// 引用 express 與 路由器
const express = require('express')
const router = express.Router()
const Record = require('../../models/record')


//  引入路由模模組
router.get('/', (req, res) => {
  Record.find()
    .lean()
    .then((record) => {
      let totalAmount = 0
      record.forEach(item => {
        totalAmount += item.amount
      })
      res.render('index', { record, totalAmount, css: 'index.css' })
    }).catch(error => console.log(error))
})


// 匯出路由器
module.exports = router
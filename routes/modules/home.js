
// 引用 express 與 路由器
const express = require('express')
const router = express.Router()
const sum = require('../../public/javascripts/totalAmount')
const Record = require('../../models/record')


//  引入路由模模組
router.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ date: 'asc' })
    .then(
      (record) => {
        return res.render('index', { record, total: sum(record), css: 'index.css' })
      }).catch(error => console.log(error))
})

// 匯出路由器
module.exports = router
const express = require('express')
const handlebars = require('handlebars')
const router = express.Router()
const sum = require('../../public/javascripts/totalAmount')
const Record = require('../../models/record')

const months = [{ month: '1', chinese: '一月' },
{ month: '2', chinese: '二月' },
{ month: '3', chinese: '三月' },
{ month: '4', chinese: '四月' },
{ month: '5', chinese: '五月' },
{ month: '6', chinese: '六月' },
{ month: '7', chinese: '七月' },
{ month: '8', chinese: '八月' },
{ month: '9', chinese: '九月' },
{ month: '10', chinese: '十月' },
{ month: '11', chinese: '十一月' },
{ month: '12', chinese: '十二月' }]

const categories = {
  家居物業: 'living',
  交通出行: 'transport',
  休閒娛樂: 'entertainment',
  餐飲食品: 'food',
  其他: 'others',
}


router.get('/', (req, res) => {
  const userId = req.user._id
  const category = req.query.category
  const month = req.query.month
  let itemDate = ''
  Record.find({ userId }) // 只顯示有登入者 userId 的資料
    .lean()
    .sort({ date: 'asc' })
    .then(record => { // 當不選擇月份與類別時
      handlebars.registerHelper("ifSelected", function (month, target, options) {
        if (month === target) {
          return options.fn(this)
        }
      })
      handlebars.registerHelper("ifSelected", function (category, target, options) {
        if (category === target) {
          return options.fn(this)
        }
      })
      if (month) { //有選擇類別或選擇月份
        record = (month !== 'all') ? record.filter(item => item.date.getMonth() + 1 === Number(month)) : record
      }
      if (category) {
        record = (category !== "all") ? record.filter(item => item.category === category) : record
      }
      getDate(record)  // 可能是最一開始無任何過濾的 也可能是過濾後的 record
      return res.render('index', { record, date: itemDate, total: sum(record), css: 'index.css', months, month, category })
    })
    .catch(error => console.log(error))
})

function getDate(record) {  // 將資料庫內的支出日期改為以 年-月-日 的方式呈現
  record.map(item => {
    item.date = `${item.date.getFullYear()}-${item.date.getMonth() + 1}-${item.date.getDate()}`
    itemDate = item.date
  })
  return itemDate
}

module.exports = router
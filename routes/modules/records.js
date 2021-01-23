const express = require('express')
const handlebars = require('handlebars')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')


// create new expense
router.get('/new', (req, res) => { // new page
  res.render('new', { css: 'edit.css' })
})

router.post('/', (req, res) => {
  const { name, category, date, amount, merchant } = req.body
  const userId = req.user._id
  const record = new Record({
    name,
    category,
    icon: category,
    date,
    amount,
    userId,
    merchant
  })

  Category.find({ categoryName: record.category })  // 從 Category 中尋找相對應的 icon 值
    .then(category => record.icon = category[0].icon) // 修改實例中的 icon 值
    .then(() => {
      record.save()  // 將實例存入資料庫
      res.redirect('/')
    }).catch(error => console.log(error))
})


// edit 
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Record.findOne({ _id, userId }) // 需把 findById 改成 findOne 才能串接多個條件
    // 改用 findOne 之後，Mongoose 不會自動轉換_id 與 id，因此我們要寫和資料庫的名稱相同，也就是 _id
    .lean()
    .then(record => {
      const categoryName = record.category
      handlebars.registerHelper('ifSelected', function (categoryName, target, options) {
        if (categoryName === target) {
          return options.fn(this)
        }
      })
      let month = record.date.getMonth() + 1
      month = (month < 10) ? `0${month}` : month // 如果月份只有一個數字，要在數字前加一個 0
      let date = record.date.getDate() + 1
      date = (date < 10) ? `0${date}` : date // 如果日期只有一個數字，要在數字前加一個 0
      let recordDate = `${record.date.getFullYear()}-${month}-${date}`
      return res.render('edit', { record, recordDate, categoryName, css: 'edit.css' })
    }).catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Record.findOne({ _id, userId })
    .then(record => {
      record = Object.assign(record, req.body)
      Category.find({ categoryName: record.category })  // 從 Category 中尋找相對應的 icon 值
        .then(category => {
          record.icon = category[0].icon // 修改實例中的 icon 值
          record.save()  //重新儲存修改後的資料
        })
    }).then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})

// delete
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})



module.exports = router
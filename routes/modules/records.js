
// 引用 express 與 路由器
const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

// create new expense
router.get('/new', (req, res) => { // new page
  return res.render('new', { css: 'edit.css' })
})

router.post('/', (req, res) => { // 將 new page 填完的資料 post
  const body = req.body
  const record = new Record({  // 從 Record 產生一個實例
    name: body.name,
    category: body.category,
    icon: body.category,
    date: body.date,
    amount: body.amount
  })
  Category.find({ categoryName: body.category }, (err, categories) => {
    // 從 Category 中尋找相對應的 icon 值
    if (err) {
      return console.error(err)
    }
    categories.forEach(category => {
      console.log(`${category.categoryName} : ${category.icon}`)
      record.icon = category.icon  // 修改實例中的 icon 值
    })
  }).lean()
    .then(() => {
      record.save()  // 將實例存入資料庫
      res.redirect('/')
    }).catch(error => console.log(error))
})


// edit 
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => {
      res.render('edit', { record, css: 'edit.css' })
    }).catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const body = req.body
  return Record.findById(id)
    .then(record => {
      record = Object.assign(record, req.body)
      return record.save()  //重新儲存修改後的資料
    }).then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})

// delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then((record) => record.remove())
    .then(res.redirect(`/`))
    .catch(error => console.log(error))
})

// 匯出路由器
module.exports = router
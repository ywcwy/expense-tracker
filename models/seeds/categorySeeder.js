const Category = require('../category')
const db = require('../../config/mongoose')

db.once('open', () => { // 連線成功
  Category.create({
    categoryName: '家居物業',
    icon: 'fas fa-home'
  }, {
    categoryName: '交通出行',
    icon: 'fas fa-shuttle-van'
  }, {
    categoryName: '休閒娛樂',
    icon: 'fas fa-grin-beam'
  }, {
    categoryName: '餐飲食品',
    icon: 'fas fa-utensils'
  }, {
    categoryName: '其他',
    icon: 'fas fa-pen'
  })
})

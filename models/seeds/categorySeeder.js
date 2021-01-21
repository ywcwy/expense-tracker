const db = require('../../config/mongoose')
const Category = require('../category')

db.once('open', () => { // 連線成功
  console.log('db connected!')
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
  }, {
    categoryName: '所有類別',
    icon: 'fas fa-reply-all'
  }
  )
    .then(() => {
      console.log(`categorySeeder has done!`)
      db.close()  // 關閉資料庫連結
    })
})

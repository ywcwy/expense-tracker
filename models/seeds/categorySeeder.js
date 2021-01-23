if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Category = require('../category')
const categoryList = require('../categories')

db.once('open', () => {
  console.log('db connected!')
  return Promise.all(Array.from(
    { length: 6 },
    (_, i) => Category.create({ ...categoryList[i] })))
    .then(() => {
      console.log(`categorySeeder has done!`)
      db.close()  // 關閉資料庫連結
      process.exit() // 關閉這段 Node 執行程序
    })
})

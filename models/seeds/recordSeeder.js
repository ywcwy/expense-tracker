const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Record = require('../record')
const User = require('../user')
const recordList = require('../records.json')
const SEED_USER = {
  name: 'clever',
  email: 'clever@example.com',
  password: 'clever00'
}
db.once('open', () => { // 連線成功
  bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: recordList.length }, (_, i) =>
        Record.create({ ...recordList[i], userId })
      ))
    })
    .then(() => {
      console.log(`recordSeeder has done!`)
      db.close() // 關閉資料庫
      process.exit() // 關閉這段 Node 執行程序
    })
})

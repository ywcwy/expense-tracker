const db = require('../../config/mongoose')
const Record = require('../record')
const recordList = require('../records.json')
db.once('open', () => { // 連線成功
  Record.create(recordList) // 寫入種子資料
    .then(() => {
      console.log(`recordSeeder has done!`)
      db.close()
    })
})

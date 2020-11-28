const recordList = require('../records.json')
const Record = require('../record')
const db = require('../../config/mongoose')
db.once('open', () => { // 連線成功
  recordList.forEach((item) => {
    Record.create({// 寫入種子資料
      name: item.name,
      icon: item.icon,
      category: item.category,
      date: item.date,
      amount: item.amount
    })
  })
  console.log('done!')
})

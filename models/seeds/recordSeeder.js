const db = require('../../config/mongoose')
const Record = require('../record')
const recordList = require('../records.json')
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
})

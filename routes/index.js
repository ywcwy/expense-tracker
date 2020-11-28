// 引用 express 與 路由器
const express = require('express')
const router = express.Router()

//  引入 home 模組程式碼
const home = require('./modules/home')
// 將網址結構符合 / 字串的 request 導向 home 模組
router.use('/', home)


//  引入 records 模組程式碼
const records = require('./modules/records')
// 將網址結構符合 / 字串的 request 導向 records 模組
router.use('/expense', records)

//  引入 filter 模組程式碼
const filter = require('./modules/filter')
// 將網址結構符合 / 字串的 request 導向 filter 模組
router.use('/filter', filter)



// 匯出路由器
module.exports = router
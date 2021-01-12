const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const records = require('./modules/records')
const filter = require('./modules/filter')
const users = require('./modules/users')


router.use('/expense', records)
router.use('/filter', filter)
router.use('/users', users)
router.use('/', home)




module.exports = router
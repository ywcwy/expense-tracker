const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

require('./config/mongoose')

const app = express()
const PORT = process.env.PORT || 3000


// 樣版引擎設定
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// setting static files, bodyParse, methodOverride
app.use(express.static('public'), bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: 'ThisIsMySecret',  // 用來驗證 session id 的字串
  resave: false,  //  true 時，會在每一次與使用者互動後，強制把 session 更新到 session store 裡。
  saveUninitialized: true // 強制將未初始化的 session 存回 session store。未初始化表示這個 session 是新的而且沒有被修改過，例如未登入的使用者的 session。

}))

app.use(routes)


app.listen(PORT, () => {
  console.log(`now is on localhost:${PORT}`)
})

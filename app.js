const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')  // 需在express-session 之後載入
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

require('./config/mongoose')

const app = express()
const PORT = process.env.PORT || 3000



app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'), bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: 'ThisIsMySecret',  // 密鑰：用來驗證 session id 的字串
  resave: false,  //  true 時，會在每一次與使用者互動後，強制把 session 更新到 session store 裡。
  saveUninitialized: true // 強制將未初始化的 session 存回 session store。未初始化表示這個 session 是新的而且沒有被修改過，例如未登入的使用者的 session。
}))

usePassport(app) // app 為 passport 模組 中的必要參數，需在路由之前呼叫 passport 函式

app.use((req, res, next) => {   // 放在 res.locals 裡的資料，所有 view 都可以存取
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user  // 是在反序列化時取出的user值
  next()
})

app.use(routes)


app.listen(PORT, () => {
  console.log(`now is on localhost:${PORT}`)
})

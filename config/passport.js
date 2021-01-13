const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = app => {
  // 初始化passport模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 登錄策略
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {  //usernameField: 'email'，把驗證項目從預設的 username 改成 email
    User.findOne({ email })
      .then(user => {
        if (!user) { return done(null, false, req.flash('error', 'This email is not registered.')) }
        if (user.password !== password) { return done(null, false, req.flash('error', 'The email or password was wrong.')) }
        return done(null, user)
      })
      .catch(err => done(err, false))
  }))

  // 序列化與反序列化
  passport.serializeUser((user, done) => {  // 使用 user 去尋找對應的 user id
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {  // 使用 user id 反尋找其 user
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null)) // 其實 Passport 看到第一個參數有 err 就不會處理後面的參數了，但多放一個 null 在語義上明確表達 user 是空的
  })
}
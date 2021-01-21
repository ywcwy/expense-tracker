const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const FacebookStrategy = require('passport-facebook').Strategy

module.exports = app => {
  // 初始化passport模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 登錄策略
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {  //usernameField: 'email'，把驗證項目從預設的 username 改成 email
    if (!email || !password) { return done(null, false, req.flash('error', '請輸入email 及 password。')) }
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, req.flash('error', '此 email 尚未被註冊。'))
        }
        return bcrypt
          .compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              return done(null, false, req.flash('error', 'email 或 password 錯誤。'))
            } return done(null, user)
          })
      })
      .catch(err => done(err, false))
  }))
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    const { name, email } = profile._json
    User.findOne({ email })
      .then(user => {
        if (user) return done(null, user)
        const randomPassword = Math.random().toString(36).slice(-8)
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          }))
          .then(user => done(null, user))
          .catch(err => done(err, false))
      })
  }
  ))

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
const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const { rawListeners } = require('../../models/user')

router.get('/login', (req, res) => res.render('login'))

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/users/login',
  successRedirect: '/'
}))


router.get('/register', (req, res) => res.render('register'))

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email })
    .then(user => {
      if (user) { // 如果有找到，代表此 email 已註冊過
        console.log('User already exists.')
        return res.render('register', {
          name, email, password, confirmPassword
        })
      }
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
})

router.get('/logout', (req, res) => {
  req.logout() // 為 passport.js 提供的函式
  res.redirect('/users/login')
})

module.exports = router
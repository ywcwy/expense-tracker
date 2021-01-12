// 匯出一個物件：內容是 authenticator 函式
module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next() // 如果驗證通過，則執行下一個 middleware
    }
    res.redirect('/users/login') // 如果不通過，返回 login 頁面
  }
}
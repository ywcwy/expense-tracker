function sum(record) {
  let totalAmount = 0
  let total = 0
  // const record = Array.from(expense)
  record.forEach((item) => {
    totalAmount += item.amount  // 先計算總金額
    total = thousandComma(totalAmount)
    item.amount = thousandComma(item.amount)
  })
  return total
}

// 金額格式化：加上千分數逗點s
function thousandComma(number) {
  let num = number.toString() // 金額先轉為字串
  const pattern = /(-?\d+)(\d{3})/  // 字串中，如果末三位為數字，且前面有一個或多個數字，就會適用此模式
  while (pattern.test(num)) { //使用迴圈以三位數、三位數的方式一直測試，直到不符合上述，回傳false 離開迴圈
    num = num.replace(pattern, "$1,$2")
  }
  return num //回傳加上逗點後的數字
}

module.exports = sum





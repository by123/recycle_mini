// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const sum = event.a + event.b
  return new Promise((resolve, reject) => {
    // 在1秒后返回结果给调用方（小程序 / 其他云函数）
    setTimeout(() => {
      resolve(sum)
    }, 1000)
  })
}
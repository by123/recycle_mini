// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  traceUser: true,
  env: 'recycle-nui71'
})
const db = cloud.database()

exports.main = async (event, context) => {
  try {
    const wxContext = cloud.getWXContext()
    return db.collection('user').where({
      openid: wxContext.OPENID
    }).count().then(res => {
      if (res.total == 0) {
        return db.collection('user').add({
          data: {
            openid: wxContext.OPENID,
            unionid: wxContext.UNIONID,
            nickName: event.user.nickName,
            gender: event.user.gender,
            language: event.user.language,
            city: event.user.city,
            province: event.user.province,
            country: event.user.country,
            avatarUrl: event.user.avatarUrl,
            createTime: new Date()
          }
        })
      }
    });
  } catch (e) {
    console.error(e)
  }
}
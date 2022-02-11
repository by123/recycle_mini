const cloud = require('wx-server-sdk')
cloud.init({
  traceUser: true,
  env: 'recycle-nui71'
})
const db = cloud.database()
exports.main = async (event, context) => {
  try {
    const wxContext = cloud.getWXContext()
    return await db.collection('new').add({
      data: {
        openid: wxContext.OPENID,
        unionid: wxContext.UNIONID,
        name: event.name,
        category: event.category,
        other:event.other,
        createTime: new Date()
      }
    })
  } catch (e) {
    console.error(e)
  }
}
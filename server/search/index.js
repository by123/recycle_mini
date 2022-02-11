// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async(event, context) => {
  let {index,value} = event
  return db.collection('rubbish').where(_.or([{
      "name": db.RegExp({
        regexp: value,
        options: 'i'
      })
    }, {
      "cname": db.RegExp({
        regexp: value,
        options: 'i'
      })
    }])).skip(index)
    .limit(20)
    .get();
}
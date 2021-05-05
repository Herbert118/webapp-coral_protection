// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
  var ids = event.ids
  var preResult =  await db.collection("questions").where({
    _id:db.command.nin(ids)
  }).get()
  var result = preResult.data[Math.floor(Math.random() * preResult.data.length)]
  return {
    ques: result,
  }
}
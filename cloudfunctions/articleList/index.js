// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
  var articles =[];
  var pre = await db.collection("articles").field({
    abstract:true,
    title:true,
    imgRoute:true
  }).get()

  preResult = pre.data; 

  for(var key = 0;key < preResult.length;key++){
    articles.push({
      abstract:preResult[key].abstract,
      title:preResult[key].title,
      imgRoute:preResult[key].imgRoute.split("_",10)[0]
    })
  }


  return {
    articles
  }
}
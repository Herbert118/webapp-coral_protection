
const cloud = require('wx-server-sdk')

cloud.init()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
  try{
    var result = await db.collection("articles").doc(event.articleId+"").get();
    //console.log(result);
  }
  catch(err){
    console.log(err);
  }
  var paras = [];
  var bodys = result.data.body.split("_",10);
  var imgRoutes = result.data.imgRoute.split("_",10);
  for(var i = 0; i<bodys.length;i++){
    paras.push({
      text: bodys[i],
      img:imgRoutes[i]
    })
  }
  
  
  return {
    title:result.data.title,
    paras:paras,
  }
}
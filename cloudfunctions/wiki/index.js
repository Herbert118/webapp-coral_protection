
const cloud = require('wx-server-sdk')

cloud.init()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
  console.log(event);

  if(event.list == true){
    var wikis =[];
    var pre = await db.collection("wiki").field({
      name:true,
      imgRoute:true
    }).get()
  
    preResult = pre.data; 
    console.log(preResult);
    for(var key = 0;key < preResult.length;key++){
      wikis.push({
        name:preResult[key].name,
        imgRoute:preResult[key].imgRoute.split("_",10)[0],
        ifshow:true
      })
    }
  
  
    return {
      wikis
    }
  
  }//end if
  else{

  

  try{
    var result = await db.collection("wiki").doc(event.wikiId+"").get();
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
    name:result.data.name,
    paras:paras,
  }
} 
}
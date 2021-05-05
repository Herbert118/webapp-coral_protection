//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true, 
      })
    }
    var env = wx.getAccountInfoSync()
    console.log(env);
    if(env.miniProgram.envVersion=="develop"){
      //通过运行环境来判断是否可管理
      this.globalData = {
        canDoUpload:true
      }      
    }else{   
      this.globalData = {
        canDoUpload:false
      }
      
    }
  
  }
})

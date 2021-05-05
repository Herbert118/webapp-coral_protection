const app  =getApp();
Page({
  
  data: {
    articles: [],
    canDoUpload:false,
  },

  navtoarticle(e) {
    console.log(e);
    const id = e.currentTarget.id
    wx.navigateTo({
      url: `./article/article?id=${id}`,
      //用id参数确定文章
    })
  },

  navToForm(e) {
    //管理页面
    wx.navigateTo({
      url: './articleForm/articleForm',
    })
  },

  onLoad: function (options) {
    
    var that = this;
    that.setData({
      canDoUpload : app.globalData.canDoUpload
    })
    //拉取文章列表
    wx.cloud.callFunction({
      name: "articleList",
      success(res) {
        console.log(res);
        that.setData({
          articles: res.result.articles.reverse()
        })
      },
      fail(err) {
        console.log(err);
      }
    })

  },


  onReady: function () {

  },

 
  onShow: function () {
    
  },

  
  onHide: function () {

  },


  onUnload: function () {

  },

  
  onPullDownRefresh: function () {

  },

 
  onReachBottom: function () {

  },

  
  onShareAppMessage: function () {

  }
})
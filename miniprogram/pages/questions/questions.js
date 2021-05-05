const app = getApp()
// pages/questions/questions.js
Page({


  data: {
    canDoUpload:false
  },

  navToForm(){
    wx.navigateTo({
      url: './questionsForm/questionsForm',
    })
  },
  navToDetail(){
    wx.navigateTo({
      url: './questionsDetail/questionsDetail',
    })
  },


  onLoad: function (options) {
    this.setData({
      canDoUpload : app.globalData.canDoUpload
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
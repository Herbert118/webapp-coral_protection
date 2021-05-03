// pages/wiki/wikiDetail/wikiDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    paras:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var wikiId = options.id;
    var that = this;
    wx.cloud.callFunction({
      name:"wiki", 
      data:{
        wikiId:wikiId
      },
      success(res){
        console.log(res);
        that.setData({
          name:res.result.name,
          paras:res.result.paras
        })
      },
      fail(err){
        console.log(err);
      }


    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
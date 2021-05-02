
// pages/wiki/wiki.js
Page({

 
  data: {
    inputShowed: false,
    inputVal: "",
    wikis:[]
  },

  showInput: function () {
    this.setData({
        inputShowed: true
    });
},
hideInput: function () {
  this.setData({
      inputVal: "",
      inputShowed: false
  });
},
clearInput: function () {
  this.setData({
      inputVal: ""
  });
},
inputTyping: function (e) {
  this.setData({
      inputVal: e.detail.value
  });
},
navToForm(){
  wx.navigateTo({
    url: './wikiForm/wikiForm',
  })
},
 
navToWiki(e){
  var id = e.currentTarget.id;
  wx.navigateTo({
    url: `./wikiDetail/wikiDetail?id=${id}`,
  })
},

  onLoad: function (options) {
    var that = this;
    wx.cloud.callFunction({
      name:"wiki",
      data:{
        list:true
      },
      success(res){
        console.log(res)
        that.setData({
          wikis:res.result.wikis
        })
      },
      fail(err){
        console.log(err);
      }
    });
  

  },


  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad();
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
const app = getApp()
// pages/wiki/wiki.js
Page({

 
  data: {
    
    inputShowed: false,
    inputVal: "",
    wikis:[],
    canDoUpload:false,
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
  this.showAll()
},
clearInput: function () {
  this.setData({
      inputVal: ""
  });
  this.showAll()
},
inputTyping: function (e) {
  var str = e.detail.value
  this.setData({
      inputVal: str
  });
  var wikis = this.data.wikis;
  for(var i = 0; i<wikis.length; i++){
    console.log(wikis[i].name.search(str));
    if(wikis[i].name.search(str)<0){
      wikis[i].ifshow = false;
    }
    else{
      wikis[i].ifshow = true;
    }
    
  }
  this.setData({
    wikis:wikis
  })
},
showAll(){
  var wikis = this.data.wikis
  for(var i = 0; i<wikis.length; i++){
    wikis[i].ifshow = true
  }
  this.setData({
    wikis:wikis
  })
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
    that.setData({
      canDoUpload : app.globalData.canDoUpload
    })
    wx.cloud.callFunction({
      name:"wiki",
      data:{
        list:true
      },
      success(res){
        console.log(res)
        that.setData({
          wikis:res.result.wikis.reverse()
        })
      },
      fail(err){
        console.log(err);
      }
    });
  

  },


  onReady: function () {

  },

  
  onShow: function () {
  
  },

  
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
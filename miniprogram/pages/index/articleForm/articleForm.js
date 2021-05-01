// pages/test1/pages/test1/test3/articleForm/articleForm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formInfo:{
      body:"", 
      title:"",
      abstract:""
    },
    imgUrls:[],
    counts:0,
  },

  async formSubmit(e){
    console.log(e.detail.value);
    var that = this;
    that.setData({
      formInfo:e.detail.value
    })
    if((this.data.formInfo.body.split("_").length) != that.data.imgUrls.length){
      wx.showToast({
        title:"请保持图片数与段落数一致!",
        duration:2000
      })
      return;  
    }
    const db = wx.cloud.database()
    var counts = await db.collection("articles").count();
    console.log(counts.total);
    db.collection("articles").add({  
      data:{
        _id:counts.total+1+"", 
        title:that.data.formInfo.title,
        abstract:that.data.formInfo.abstract,
        body:that.data.formInfo.body,
        imgRoute:that.data.imgUrls.join("_")
      }}).then((res)=>{
        console.log(res);
      })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片

    var that = this ;
    var imgs = that.data.imgUrls;
    wx.chooseImage({ 
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + that.wxuuid() + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            
            console.log('[上传文件] 成功：', res)
            imgs.push(res.fileID)
            that.setData({
              imgUrls:imgs
            });
             console.log(that.data.imgUrls);
             console.log("what the hell");
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },
  wxuuid: function () {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    return uuid
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
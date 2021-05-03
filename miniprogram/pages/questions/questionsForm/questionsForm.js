// pages/test1/pages/test1/test3/questionForm/questionForm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formInfo:{},
    imgUrl:"",
    counts:0,
  },

  async formSubmit(e){
    console.log(e.detail.value);
    var info = e.detail.value;
    var choices = []
    for(var i = 0; i<4;i++){
      choices.push(info["choice_"+i])
    }
    console.log(choices)
    var that = this;
    that.setData({
      formInfo:{
        question:info.question,
        choices:choices.join("_")
      }
    })
    
    const db = wx.cloud.database()
    var counts = await db.collection("questions").count();
    console.log(counts.total);
    db.collection("questions").add({  
      data:{
        _id:counts.total+1+"", 
        question:that.data.formInfo.question,
        choices:that.data.formInfo.choices,
        imgRoute:that.data.imgUrl
      }}).then((res)=>{
        console.log(res);
        wx.navigateBack({
          delta:1
        })
      })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
  
    var that = this ;
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
        const cloudPath = 'questionImages/question-image' + that.wxuuid() + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)
            that.setData({
              imgUrl: res.fileID
            });
             console.log(that.data.imgUrl);
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
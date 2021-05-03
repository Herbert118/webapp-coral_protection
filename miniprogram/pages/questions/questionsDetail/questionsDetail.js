// pages/questions/questionsDetail/questionsDetail.js
Page({


  data: {
    ifnomore:false,
    quesIds: [],
    choices: [],
    correct: 0,
    question: "",
    imgRoute:"",
    rightNum:0,
    ifconfirm:false,
    rightIndex:-1,
    wrongIndex:-1,
  },


  onLoad: function (options) {
    var that = this
    wx.cloud.callFunction({
      name: "question",
      data: {
        ids: that.data.quesIds
      },
      success(res) {
        console.log(res);
        //如果刷穿了题库
        if (!res.result.ques) {
          that.setData({
            question: "恭喜,你已经完成了所有问答,共答对"+that.data.rightNum+"题~",
            ifnomore:true,
          })
          return;
        }

        var preChoices = res.result.ques.choices.split("_");
        that.setData({
          correct: preChoices[0],
          question: res.result.ques.question,
          imgRoute:res.result.ques.imgRoute
        })
        //随机排序
        for (var i = 0; i < preChoices.length; i++) {
          var temp = preChoices[i];
          var random = Math.floor(Math.random() * preChoices.length)
          if(i==0){
            that.setData({
              correct:random
            })
          }
          preChoices[i] = preChoices[random];
          preChoices[random] = temp;
        }
        var temp = [];
        for(var i = 0; i< preChoices.length;i++){
          temp.push({
            choice:preChoices[i],
            char:String.fromCharCode(i+65)
          })
        }
        that.setData({
          choices: temp
        })
        //记录题目id
        that.data.quesIds.push(res.result.ques._id);
      },
      fail(err) {
        console.log(err);
      }
    })
  },

  check(e){
    var that = this;
    var answer = e.detail.value.choices;
    console.log(answer);
    if(answer == that.data.correct){
      that.setData({
        ifconfirm:true,
        rightIndex:answer
      })
    }
    else{
      that.setData({
        ifconfirm:true,
        rightIndex:that.data.correct,
        wrongIndex:Number(answer)
      })
    }
    console.log(that.data)
  },
  next(){
    this.setData({
    choices: [],
    correct: 0,
    question: "",
    imgRoute:"",
    rightNum:0,
    ifconfirm:false,
    rightIndex:-1,
    wrongIndex:-1,
    })
    this.onLoad()
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
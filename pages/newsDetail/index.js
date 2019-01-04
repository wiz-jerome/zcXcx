const app = getApp()
// pages/newsDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    videoStr:'',
    showDialog: false,
    questionList:null,
    rewardAmount:10,
    actualUser:0,
    maxUser:0,
    member:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.showLoading({
      title: '加载中...',
    })
    wx.showNavigationBarLoading()
    var _this = this
    wx.request({
      url: app.globalData.serverUrl + '/activity/' + options.kid+'/detail',
      success: function (res) {
        console.log(res)
        // wx.setNavigationBarTitle({
        //   title:res.data.data.name
        // })

        _this.setData({
          title:res.data.data.name,
          rewardAmount: res.data.data.rewardAmount,
          actualUser: res.data.data.actualUser,
          maxUser: res.data.data.maxUser,
          member:{
            memberName:res.data.data.memberName,
            memberImg:res.data.data.memberImg
          }
        })
        var empty =''
        console.log(res.data.data.contentRich)
        var content = res.data.data.contentRich
        content=content.replace(new RegExp('<img', 'g'), '<img style="max-width:100%;height:auto;border-radius:6px;"')
        // 小程序不支持vedio解析
        // content=content.replace(new RegExp('embed class="video"', 'g'), "video");
        if(content.match(new RegExp('<embed class="video" '))){
          
        }
        _this.setData({
          videoStr: content
        })
        // 获取问题
        wx.request({
          url: app.globalData.serverUrl + '/my/activity/question/' + res.data.data.questionId,
          success:function(res){
            console.log(res)
            var qList = res.data.data.questionList
            for(let i=0;i<qList.length;i++){
              qList[i].isChecked = 't'//未选择的
              for(let val of qList[i].answerList){
                val.isChecked = false
              }
            }
            _this.setData({
              questionList:qList
            })
            console.log(_this.data.questionList)
          },
        })
        wx.hideLoading()
        wx.hideNavigationBarLoading()
      }
    })
  },
  // 选择答案
  checkItem:function(event){
    console.log(event)
    var i = event.currentTarget.dataset.questionindex
    var j = event.currentTarget.dataset.answerindex
    var questionListData = this.data.questionList
    questionListData[i].isChecked = j
    this.setData({
      questionList:questionListData
    })
    // console.log(this.data.questionList)
  },
  // 多选选择答案
  checkMultyItem:function(event){
    console.log(event)
    var i = event.currentTarget.dataset.questionindex
    var j = event.currentTarget.dataset.answerindex
    var questionListData = this.data.questionList
    questionListData[i].answerList[j].isChecked = !questionListData[i].answerList[j].isChecked;
    this.setData({
      questionList: questionListData
    })
    // console.log(this.data.questionList)
  },
  closeDialogf: function () {
    // app.globalData.isDialogShow = false
    this.setData({
      "showDialog": false
    })
  },
  downApp: function () {
    this.setData({
      "showDialog": true
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
  // onShareAppMessage: function () {
  
  // }
})
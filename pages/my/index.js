//获取应用实例
const app = getApp()
// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      avatarUrl:"../../asset/img/head.png",
      nickName:'登录'
    },
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showDialog:false
    // haveCEC:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.code)
    if(app.globalData.userInfo.avatarUrl){
      // console.log(app.globalData.userInfo)
      this.setData({
        userInfo:app.globalData.userInfo,
        hasUserInfo:true
      })
    }

    

  },
  toTicketDetail: function(){
    wx.navigateTo({
      url: '../ticket/index',
    })
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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    app.globalData.iv = e.detail.iv
    app.globalData.encryptedData = e.detail.encryptedData
    console.log(app.globalData.encryptedData, app.globalData.iv)
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true
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
    var _this = this
    console.log()
    // wx.getStorage({
    //   key: 'zcCECewm',
    //   success: function (res) {
    //     console.log(res)
    //     if (res.data) {
    //       _this.setData({
    //         haveCEC: true
    //       })
    //     }
    //   },
    //   fail:function(err){
    //     console.log(err)
    //     _this.setData({
    //       haveCEC: false
    //     })
    //   }
    // })
  },
  phoneCall:function(){
    wx.makePhoneCall({
      phoneNumber: '021-64356781' //仅为示例，并非真实的电话号码
    })
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

const app = getApp()
// pages/news/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList:[],
    showDialog: false,
    // showDialog: app.globalData.isDialogShow,
    isLoadingMore:false,
    isMoreData:true,
    pageSize:6,
    page:0,
    totalNum:0,
    totalPage:0,
    imagePath: '',
    haveTicket:false,//领票系统开关
    showDialogTicket:false,
    ewmSrc:null,
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    wx.showLoading({
      title: '加载中...',
    })
    this.getDataList()
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
    wx.getStorage({
      key: 'zcxcxUID',
      success: function (res) {
        console.log(res)
        if (res.data) {
          _this.setData({
            haveTicket: true
          })
        }
      },
      fail: function (err) {
        console.log(err)
        _this.setData({
          haveTicket: false
        })
      }
    })
  },
  closeTicket:function(){
    this.setData({
      showDialogTicket: !this.data.showDialogTicket
    })
  },
  // getTicket:function(e){
    
  //   console.log('获取票')
  //   console.log(e)
  //   var param = {}
  //   wx.getStorage({
  //     key: 'zcxcxUID',
  //     success: function(res) {
  //       console.log(res)
  //       app.globalData.UID = res.data
  //     },
  //   })
  //   if(e.detail.errMsg === 'getUserInfo:ok'){
  //     wx.showLoading({
  //       title: '正在获取...',
  //     })
  //     this.setData({
  //       userInfo: e.detail.userInfo,
  //       hasUserInfo: true
  //     })
  //     // 登录
  //     wx.login({
  //       success: res => {
  //         console.log('wxlogin：', res)
  //         // 发送 res.code 到后台换取 openId, sessionKey, unionId
  //         // app.globalData.code = res.code
  //         app.globalData.userInfo = e.detail.userInfo
  //         app.globalData.iv = e.detail.iv
  //         app.globalData.encryptedData = e.detail.encryptedData
  //         // console.log(app.globalData.encryptedData, app.globalData.iv)
  //         param = {
  //           UID: app.globalData.UID,
  //           code: res.code,
  //           encryptedData: app.globalData.encryptedData,
  //           iv: app.globalData.iv
  //         }
  //         console.log('param:',param)
  //         // 请求
  //         var _this = this
  //         wx.request({
  //           url: app.globalData.serverUrl + '/ticket/getCECTicket',
  //           method: 'POST',
  //           data:param,
  //           success: function (res) {
  //             console.log(res)
  //             wx.setStorage({
  //               key: 'zcxcxUID',
  //               data: res.data.data.code,
  //             })
  //             wx.setStorage({
  //               key: 'zcCECewm',
  //               data: res.data.data.imageStr,
  //             })
  //             // app.globalData.userInfo.UID = res.data.data.code
  //             console.log(app.globalData.userInfo)
  //             _this.setData({
  //               showDialogTicket:!_this.data.showDialogTicket,//显示弹窗
  //               ewmSrc: res.data.data.imageStr,
  //               haveTicket:true
  //             }) 
  //             wx.hideLoading()
  //           }
  //         })
  //       }
  //     })
  //   }else{
  //     wx.showModal({
  //       title: '阅值提醒',
  //       content: '不授权无法获取CEC门票哦!',
  //     })
  //   }    

  // },
  myCatchTouch:function(){
    console.log('stop user scroll it!');
    wx.stopPullDownRefresh()
    return;
  },
  // 请求列表数据
  getDataList:function(that){
    var _this = this
    var currentResult = this.data.page * this.data.pageSize
    wx.request({
      url: app.globalData.serverUrl + '/activity/listForMini?pageSize=' + this.data.pageSize + '&sortType=1&listType=4&currentResult=' + currentResult + '&sortRule=2',
      success: function (res) {
        console.log(res)
        var totalPage = parseInt(res.data.total / _this.data.pageSize)
        _this.setData({
          totalNum: res.data.total,
          totalPage: totalPage
        })
        var dataList = res.data.data
        // console.log((new Date()).getTime())
        var nowTime = (new Date()).getTime()
        for (let i = 0; i < dataList.length; i++) {
          var endDate = dataList[i].endTime.split(' ')[0]
          console.log(new Date(), new Date(endDate))
          console.log((new Date()).getTime(), (new Date(endDate)).getTime())
          var lastTime = (new Date(endDate)).getTime() - (new Date()).getTime()
          console.log(lastTime)
          if (lastTime <= 0) {
            dataList[i].lastTime = 0
          } else {
            dataList[i].lastTime = Math.ceil(lastTime / 1000 / 60 / 60 / 24)
          }
          // 完成人数百分比
          dataList[i].joinpercent = (Math.floor((dataList[i].actualUser / dataList[i].maxUser * 100))).toFixed(0) + '%'
        }
        console.log(dataList)
        _this.setData({
          newsList: dataList
        })
        console.log(_this.data.newsList)
        wx.hideLoading()
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  goDetail:function(opt){
    console.log(opt)
    var kid = opt.currentTarget.dataset.kid
    wx.navigateTo({
      url: '../newsDetail/index?kid='+kid,
    })
  },
  downApp:function(){
    app.globalData.isDialogShow = true
    this.setData({
      "showDialog": app.globalData.isDialogShow
    })
  },
  closeDialogf:function(){
    // app.globalData.isDialogShow = false
    this.setData({
      "showDialog": false
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
    wx.showLoading({
      title: '加载中...',
    })
    wx.showNavigationBarLoading()
    this.setData({
      page:0,
      isMoreData: true,//没有更多数据可加载
    })
    this.getDataList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var _this = this
    this.setData({
      page:this.data.page+1,
      isLoadingMore:true
    })
    var currentResult = this.data.page * this.data.pageSize

    if (this.data.page >this.data.totalPage){
      this.setData({
        isMoreData:false,//没有更多数据可加载
      })
      var timer = setTimeout(function(){
        _this.setData({
          isLoadingMore: false
        })
      },1000)
    }else{
      wx.request({
        url: app.globalData.serverUrl + '/activity/listForMini?pageSize=' + this.data.pageSize + '&sortType=1&listType=4&currentResult=' + currentResult + '&sortRule=2',
        success: function (res) {
          console.log(res)
          var dataList = res.data.data
          var nowTime = (new Date()).getTime()
          for (let i = 0; i < dataList.length; i++) {
            var endDate = dataList[i].endTime.split(' ')[0]
            console.log(new Date(), new Date(endDate))
            console.log((new Date()).getTime(), (new Date(endDate)).getTime())
            var lastTime = (new Date(endDate)).getTime() - (new Date()).getTime()
            console.log(lastTime)
            if (lastTime <= 0) {
              dataList[i].lastTime = 0
            } else {
              dataList[i].lastTime = Math.ceil(lastTime / 1000 / 60 / 60 / 24)
            }
            // 完成人数百分比
            dataList[i].joinpercent = (dataList[i].actualUser / dataList[i].maxUser * 100).toFixed(0) + '%'
          }
          console.log(dataList)
          var list = _this.data.newsList.concat(dataList)
          _this.setData({
            newsList: list,
            isLoading:false
          })
          wx.hideLoading()
          console.log(_this.data.newsList)
        },
        fail: function (err) {
          console.log(err)
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
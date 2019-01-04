//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var _this = this
    wx.getStorage({
      key: 'zcxcxUID',
      success: function(res) {
        console.log('storage', res)
        _this.globalData.UID = res.data
      },
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              this.globalData.iv = res.iv
              this.globalData.encryptedData = res.encryptedData
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: {},
    // serverUrl: 'http://192.168.1.118:9090',//开发
    // serverUrl: 'https://appapi-pre.zhaocaiapp.cn', //预生产
    serverUrl: 'https://appapi.zhaocaiapp.cn',//生产
    isDialogShow: false,
    // code:null,
    iv: null,
    encryptedData: null,
    UID: '',
  },
})
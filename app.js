//app.js
var util = require('./utils/util.js');
var xhtApp = require('./utils/xhtad_sdk.min.js');

App({
  onLaunch: function() {
    var that = this;
    util.getSystemInfo(function(result) {
      that.globalData.screenHeight = result.screenHeight;
      that.globalData.screenWidth = result.screenWidth;
      that.globalData.pixelRatio = result.pixelRatio;
    })
    wx.cloud.init({
      traceUser: true,
      env: that.globalData.env,
      success: function(e) {
        console.log('云函数初始化成功');
        that.getUserInfo();
      },
      fail: function(e) {
        console.log('云函数初始化失败');
      }
    });
    wx.getUserInfo({
      withCredentials: false,
      success: function(res) {
        console.log(res);
      }
    });
  },

  getUserInfo: function() {
    wx.cloud.callFunction({
      'name': 'userinfo',
      success: function(res) {
        getApp().globalData.openid = res.result.openid;
        console.log(res);
      },
      fail: function(e) {
        console.log(e);
      }
    });
  },

  globalData: {
    env: 'recycle-nui71',
    openid: null,
    screenWidth: 0,
    screenHeight: 0,
    pixelRatio:0,
    resultDatas:[]
  }

})
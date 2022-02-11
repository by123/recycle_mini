//index.js
const app = getApp()
const db = wx.cloud.database()
var util = require('../../utils/util.js')
var constant = require('../../utils/constant.js')

Page({
  data: {
    menus: ["首页", "测试", "分类", "帮助"],
    imgs: [constant.IMG_MENU_HOME, constant.IMG_MENU_TEST, constant.IMG_MENU_CATEGORY, constant.IMG_MENU_HELP],
    currentTab: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hiddenIndex: true,
    hiddenAuth: true,
  },

  onLoad: function () {
    var that = this;
    this.setData({
      currentTab: 0,
    });
    this.authLogin();
  },

  //切换tab
  swichNav: function (e) {
    let position = e.currentTarget.dataset.index;
    if (this.data.currentTab != position) {
      this.setData({
        currentTab: position
      });
    }
    wx.setNavigationBarTitle({
      title: this.data.menus[position]
    })
  },

  //授权登录
  authLogin: function () {
    var that = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              //已授权，显示授权页面
              that.setData({
                hiddenIndex: false,
                hiddenAuth: true
              });
              wx.setStorage({
                key: 'user',
                data: res.userInfo,
              })
              // wx.login({
              //   success: res => {
              //     wx.request({
              //       url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxd6e4e5116073ea17&secret=8da8e0d6e77d24865615033cdc879d6c&js_code=' + res.code + '&grant_type=authorization_code',
              //         success: res => {
              //             console.log(res);
              //         }
              //     });
              //   }
              // });
            }
          });
        } else {
          //未授权，显示授权页面
          that.setData({
            hiddenIndex: true,
            hiddenAuth: false
          });
        }
      }
    });
  },
  //获取用户信息
  onGotUserInfo: function (e) {
    var that = this
    var userInfo = e.detail.userInfo;
    if (userInfo) {
      //上传用户资料
      wx.cloud.callFunction({
        name: 'user',
        data: {
          user: userInfo,
        },
        success: function (res) {
          that.setData({
            hiddenIndex: false,
            hiddenAuth: true
          });
          wx.setStorage({
            key: 'user',
            data: userInfo,
          })
        }
      });
    }
    else {
      wx.showToast({
        title: '请先授权小程序',
        icon: 'none'
      });
    }
  },


  onShareAppMessage: function (ops) {
    return {
      title: '上门垃圾分类',
      path: 'pages/index/index',
      success: function (res) { },
      fail: function (res) { }
    }
  }
})

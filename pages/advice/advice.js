// pages/advice/advice.js
var util = require('../../utils/util.js')
var constant = require('../../utils/constant.js')

Page({
  data: {
    contact: '',
    advice: '',
    imglist: [constant.IMG_SUPPORT],
    // 需在 xhtad.ad 中配置广告位
    xhtad: {
      adData: {},
      ad: {
        banner: true, // banner 广告开关 insert: true, // 插屏广告开关
        fixed: true // 悬浮广告开关 //如不需要展示删除或设置为 false 即可
      }
    }
  },

  onLoad: function (options) {

  },

  onInputChange: function (e) {
    this.data.contact = e.detail.value;
  },


  bindFormSubmit: function (e) {
    this.data.advice = e.detail.value.textarea;
    let position = e.detail.target.id;
    if (position == 1) {
      this.goSupport();
    }
    if (util.isEmpty(this.data.contact)) {
      wx.showToast({
        title: '请输入您的联系方式',
        icon: 'none'
      });
      return;
    }
    if (util.isEmpty(this.data.advice)) {
      wx.showToast({
        title: '请输入反馈的内容',
        icon: 'none'
      });
      return;
    }
    wx.cloud.callFunction({
      name: 'advice',
      data: {
        contact: this.data.contact,
        content: this.data.advice,
      },
      success: function (res) {
        wx.showToast({
          title: '感谢您的支持',
          icon:'none',
          complete:function(e){
            setTimeout(function () {
              wx.navigateBack();
            }, 1500)
          }
        });
      },
      fail: console.error
    });
  },

  goSupport: function () {
    wx.previewImage({
      current: 0,
      urls: this.data.imglist
    })
  }

})
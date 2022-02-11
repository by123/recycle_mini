// pages/exam/result.js
Page({


  data: {
    datas: []
  },


  onLoad: function (options) {
    this.setData({
      datas: getApp().globalData.resultDatas
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
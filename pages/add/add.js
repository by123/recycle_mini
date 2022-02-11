// pages/add.js
var util = require('../../utils/util.js')

Page({

  data: {
    items: [{
        name: '可回收物',
        checked: true
      },
      {
        name: '干垃圾',
        checked: false
      },
      {
        name: '湿垃圾',
        checked: false
      },
      {
        name: '有害垃圾',
        checked: false
      },
      {
        name: '其他',
        checked: false
      }
    ],
    hiddenOther:true,
    nameValue:'',
    categoryValue:'可回收物',
    otherValue:'',
    // 需在 xhtad.ad 中配置广告位
    xhtad: {
      adData: {},
      ad: {
        banner: true, // banner 广告开关 insert: true, // 插屏广告开关
        fixed: true // 悬浮广告开关 //如不需要展示删除或设置为 false 即可
      }
    }

  },

  onLoad: function(options) {

  },

  onNameInputChange:function(e){
    this.data.nameValue = e.detail.value;
  },

  onOtherInputChange:function(e){
    this.data.otherValue = e.detail.value;
  },

  onRadioChange: function(e) {
    this.data.categoryValue = e.detail.value;
    if (this.data.categoryValue == '其他'){
      this.setData({
        hiddenOther:false
      })
    }else{
      this.setData({
        hiddenOther: true
      })
    }
  },

  onCommitTap:function(e){
    if(util.isEmpty(this.data.nameValue)){
      wx.showToast({
        title: '请输入垃圾名称',
        icon:'none'
      })
      return;
    }
    if(this.data.categoryValue == '其他' && util.isEmpty(this.data.otherValue)){
      wx.showToast({
        title: '请输入垃圾的正确处理方式',
        icon: 'none'
      })
      return;
    }
    wx.cloud.callFunction({
      name: 'new',
      data: {
        name: this.data.nameValue,
        category: this.data.categoryValue,
        other: this.data.otherValue
      },
      success: function (res) {
        wx.showToast({
          title: '添加成功'
        });
        wx.navigateBack();
      },
      fail: console.error
    })
  }


})
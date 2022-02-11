// pages/search.js

var util = require('../../utils/util.js')
var netutil = require('../../utils/netutil.js')
var constant = require('../../utils/constant.js')

let addPage = '../add/add';
Page({
  data: {
    inputValue: '',
    datas: null,
    index: 0,
    hasResult:true,
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
    var that = this;
    wx.setNavigationBarTitle({
      title: constant.STR_SEARCH_RESULT,
    })
  },
  //点击取消
  onCancelTap: function() {
    this.setData({
      inputValue: '',
      datas: null
    })
  },
  //输入变化
  onTextChange: function(e) {
    this.data.inputValue = e.detail.value;
    this.data.datas = [];
    this.data.index = 0;
    this.queryDatas(this.data.inputValue);
  },
  //查询搜索结果
  queryDatas: function(value) {
    console.log(value)
    var that = this;
    netutil.queryRubbish(value, this.data.index,
      function(res) {
        that.data.index += 20;
        console.log(res);
        that.handleDatas(res.data);
      })
  },
  //处理搜索结果
  handleDatas: function(datas) {
    console.log(datas);
    if (util.isEmpty(this.data.datas)) {
      if (util.isEmpty(datas)){
        this.setData({
          hasResult: false
        })
      }else{
        this.setData({
          hasResult: true
        })
      }
      this.setData({
        datas: datas,
      })
    } else {
      this.setData({
        hasResult: true,
        datas: this.data.datas.concat(datas)
      })
    }
  },
  //点击去添加
  onAddTap:function(){
    util.openPage(addPage,null);
  },

  onReachBottom: function() {
    this.queryDatas(this.data.inputValue);
  },

  onShareAppMessage: function() {

  }
})
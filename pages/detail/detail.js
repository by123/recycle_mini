// pages/detail/detail.js
var util = require('../../utils/util.js')
var constant = require('../../utils/constant.js')
var netutil = require('../../utils/netutil.js')

Page({


  data: {
    rubbishData:{},
    categoryData:{},
    tips:'',
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
    var rid = options.rid;
    this.requestDetail(rid);
  },

  requestDetail: function (rid) {
    var that = this;
     netutil.queryRubbishDetail(rid,function(res){
       console.log(res);
       that.setData({
         rubbishData: res
       })
      that.requestCategory(that.data.rubbishData.cid);
     })
  },

  requestCategory:function(cid){
    var that = this;
    netutil.queryCategory(cid, function (res) {
      console.log(res);
      that.setData({
        categoryData:res
      })
    })
  }


})
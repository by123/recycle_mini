// pages/home/home.js
var util = require('../../utils/util.js')
var constant = require('../../utils/constant.js')
var netutil = require('../../utils/netutil.js')
let addPage = '../add/add';
let detailPage = '../detail/detail';

Component({

  properties: {

  },

  data: {
    image: constant.IMG_HOME_TIPS,
    inputValue: '',
    datas: [],
    index: 0,
    hasDatas: false,
    isFirst:true
  },

  methods: {
    onAddTap:function(e){
      util.openPage(searchPage, null);
    },
    //输入变化
    onTextChange: function (e) {
      this.data.inputValue = e.detail.value;
      this.data.datas = [];
      this.data.index = 0;
      this.queryDatas(this.data.inputValue);
    },
    //查询搜索结果
    queryDatas: function (value) {
      var that = this;
      netutil.queryRubbish(value, this.data.index,
        function (res) {
          that.data.index += 20;
          console.log(res.data);
          that.handleDatas(res.data);
        })
    },
    //处理搜索结果
    handleDatas: function (datas) {
      if (util.isEmpty(this.data.datas)) {
        if (util.isEmpty(datas)) {
          this.setData({
            hasDatas: false,
            isFirst:false,
            datas:datas
          })
        } else {
          this.setData({
            hasDatas: true,
            isFirst:false,
            datas: datas,
          })
        }
      } else {
        this.setData({
          hasDatas: true,
          datas: this.data.datas.concat(datas)
        })
      }
    },
    //点击去添加
    onAddTap: function () {
      util.openPage(addPage, null);
    },

    onReachBottom: function () {
      this.queryDatas(this.data.inputValue);
    },

    onItemClick:function(e){
      let position = e.currentTarget.dataset.index;
      console.log(this.data.datas[position])
      this.setData({
        isFirst: true
      });
      var item = this.data.datas[position];
      var params = [{ 'key': 'rid', 'value': item.rid}];
      util.openPage(detailPage, params);
    }
  }
  
})
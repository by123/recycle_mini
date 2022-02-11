// pages/test/test.js
var netutil = require('../../utils/netutil.js')
var util = require('../../utils/util.js')
let rightImg = '../../imgs/ic_right.png';
let wrongImg = '../../imgs/ic_wrong.png';
let resultPage = 'result';

Page({


  data: {
    btns: [{
        name: '可回收物',
        color: 'recycle_bg_color',
        show: false,
        image: ''
      },
      {
        name: '干垃圾',
        color: 'residual_bg_color',
        show: false,
        image: ''
      },
      {
        name: '湿垃圾',
        color: 'household_bg_color',
        show: false,
        image: ''
      },
      {
        name: '有害垃圾',
        color: 'hazardous_bg_color',
        show: false,
        image: ''
      }
    ],
    current: {},
    currentIndex: 0,
    datas: [],
    isFinish: false,
    score: 0,
    rightCount: 0,
    errorCount: 0,
    titleStr: '',
    beyondStr: '',
    // 需在 xhtad.ad 中配置广告位
    xhtad: {
      adData: {},
      ad: {
        banner: true, // banner 广告开关 insert: true, // 插屏广告开关
        fixed: true // 悬浮广告开关 //如不需要展示删除或设置为 false 即可
      }
    },

    //小程序码路径
    qrcodeImgPath: '',
    //背景图路径
    bgImgPath: '',
    //头像路径
    headImgPath:'',
    //保存相册临时路径
    shareImgPath: '',
    userInfo:{},
    hiddenSave:true
  },


  onLoad: function(options) {
    var that = this;
    this.downloadImg();
    this.queryRubbish();
  },

  //点击回答
  onSelectBtnTap: function(e) {
    var position = parseInt(e.currentTarget.dataset.index);
    let btn = this.data.btns[position];
    console.log(btn.name);
    console.log(this.data.current.cname);
    var category = [{
      'name': '可回收物',
      'tag': 'A'
    }, {
      'name': '干垃圾',
      'tag': 'B'
    }, {
      'name': '湿垃圾',
      'tag': 'C'
    }, {
      'name': '有害垃圾',
      'tag': 'D'
    }];
    if (btn.name == this.data.current.cname) {
      console.log('答对了');
      this.data.score += 10;
      this.data.rightCount++;
      //正确答案
      category[position].right = true;
    } else {
      //回答的答案
      category[position].answer = true;
      for (var index in category) {
        if (category[index].name == this.data.current.cname) {
          category[index].right = true;
        }
      }
      console.log('答错了');
      this.data.errorCount++;
    }
    this.data.datas[this.data.currentIndex].subject = category;
    console.log(this.data.datas);
    this.data.datas[this.data.currentIndex].answer = btn.name;
    this.showNextSubject();
  },

  //显示下一题
  showNextSubject: function() {
    this.data.currentIndex++;
    if (this.data.currentIndex >= 10) {
      this.showResult();
      return;
    }
    let next = this.data.datas[this.data.currentIndex];
    this.setData({
      current: next,
      currentIndex: this.data.currentIndex
    })
  },

  //答题结果
  showResult: function() {
    this.generateStr();
    this.setData({
      isFinish: true,
      datas: this.data.datas,
      score: this.data.score,
      rightCount: this.data.rightCount,
      errorCount: this.data.errorCount,
      titleStr: this.data.titleStr,
      beyondStr: this.data.beyondStr,
    });
  },

  //获取称号和超过%
  generateStr: function() {
    if (this.data.rightCount >= 0) {
      this.data.titleStr = '倔强青铜';
      this.data.beyondStr = '超过了1%的垃圾分类达人(灵魂的拷问：你是什么垃圾？)'
    }
    if (this.data.rightCount >= 1) {
      this.data.titleStr = '秩序白银';
      this.data.beyondStr = '超过了5%的垃圾分类达人(来自阿姨一万点鄙视伤害!)'
    }
    if (this.data.rightCount >= 2) {
      this.data.titleStr = '荣耀黄金';
      this.data.beyondStr = '超过了20%的垃圾分类达人(这不是我想要的垃圾桶！)'
    }
    if (this.data.rightCount >= 4) {
      this.data.titleStr = '尊贵铂金';
      this.data.beyondStr = '超过了36%的垃圾分类达人(别乱丢，乱丢，丢！)'
    }
    if (this.data.rightCount >= 6) {
      this.data.titleStr = '永恒钻石';
      this.data.beyondStr = '超过了66%的垃圾分类达人(继续努力哟！)'
    }
    if (this.data.rightCount >= 8) {
      this.data.titleStr = '最强王者';
      this.data.beyondStr = '超过了86%的垃圾分类达人(我要再扔十个！)'
    }
    if (this.data.rightCount == 10) {
      this.data.titleStr = '荣耀王者';
      this.data.beyondStr = '超过了99%的垃圾分类达人(还有谁！！！)'
    }
  },


  onOnceMoreBtnClick: function() {
    this.setData({
      current: {},
      currentIndex: 0,
      datas: [],
      isFinish: false,
      score: 0,
      rightCount: 0,
      errorCount: 0,
      titleStr: '',
      beyondStr: ''
    });
    this.queryRubbish();
  },
  onAnswerBtnClick: function() {
    getApp().globalData.resultDatas = this.data.datas;
    util.openPage(resultPage, null);
  },



  queryRubbish: function() {
    var that = this;
    netutil.queryTenRubbish(function(res) {
      console.log(res);
      var datas = res.data;
      var firstData = datas[that.data.currentIndex];
      console.log(datas);
      that.setData({
        datas: datas,
        current: firstData,
        currentIndex: that.data.currentIndex
      })
    });
  },

  //点击分享，开始绘制
  onShareBtnClick: function() {
    this.setData({
      hiddenSave:false
    })
    var that = this;
    const ctx = wx.createCanvasContext('share');
    var width = 345;
    var height = 500;
    var percent = 2;
    //绘制底框
    ctx.setFillStyle('rgb(156, 235, 186)')
    ctx.fillRect(0, 30 / percent, width, height)
    //绘制背景图
    var bgHeight = width * 750 / 842;
    ctx.drawImage(this.data.bgImgPath, 0, height - bgHeight, width, bgHeight);
    //绘制标题
    ctx.font = '12px PingFangSC-Medium';
    ctx.setFillStyle('#353435');
    ctx.setTextAlign('center');
    ctx.fillText('2019垃圾分类统一考试全国卷(一)', width / 2, 120 / percent);
    //绘制姓名
    ctx.font = '16px PingFangSC-Regular';
    ctx.setFillStyle('#353435');
    ctx.fillText('姓名：', 160 / percent, 210 / percent);
    ctx.fillText('得分：', 500 / percent, 210 / percent);
    ctx.font = '30px PingFangSC-Medium';
    ctx.setFillStyle('tomato');
    ctx.fillText(this.data.userInfo.nickName, 240 / percent, 210 / percent);
    ctx.fillText(this.data.score, 580 / percent, 210 / percent);

    //绘制小程序码
    var qrcodeHeight = width * 80 / 280;
    ctx.drawImage(this.data.qrcodeImgPath, 0, height - qrcodeHeight, width, qrcodeHeight);
    //绘制头像
    ctx.drawImage(this.data.headImgPath, (width - 160/percent) / 2, 280 / percent, 160 / percent, 160 / percent);
    //绘制荣耀
    ctx.font = '18px PingFangSC-Regular';
    ctx.setFillStyle('red');
    ctx.fillText('获得「 ' + this.data.titleStr + ' 」的称号', width / 2, 520 / percent);
    //绘制打败多人
    ctx.font = '12px PingFangSC-Regular';
    ctx.setFillStyle('#757675');
    ctx.fillText(this.data.beyondStr, width / 2, 590 / percent);
    //
    ctx.stroke();
    ctx.draw(false, function(e) {
      that.canvasToImage();
    });
  },

  //将图片保存到本地，用于绘制分享页面
  downloadImg: function() {
    var that = this;
    wx.getImageInfo({
      src: '../../imgs/share_mini.png',
      success: function(res) {
        that.setData({
          qrcodeImgPath: '../../' + res.path
        });
      }
    });
    wx.getImageInfo({
      src: '../../imgs/bg.png',
      success: function (res) {
        that.setData({
          bgImgPath: '../../' + res.path
        });
      }
    });
    wx.getStorage({
      key: 'user',
      success: function(res) {
        that.data.userInfo = res.data;
        console.log("用户头像："+res.data.avatarUrl);
        wx.downloadFile({
          url:res.data.avatarUrl,
          success:function(res){
            console.log(res);
            if (res.statusCode === 200) {
              that.data.headImgPath = res.tempFilePath;
            }
          }
        });
      },
    })

  },
  //画布转为图片
  canvasToImage: function() {
    var that = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 345,
      height: 500,
      destWidth: 345 * getApp().globalData.pixelRatio,
      destHeight: 500 * getApp().globalData.pixelRatio,
      quality:1,
      canvasId: 'share',
      success: function(res) {
        console.log("生成图片路径:" + res.tempFilePath);
        that.setData({
          shareImgPath: res.tempFilePath,
        })
        if (!res.tempFilePath) {
          wx.showModal({
            title: '提示',
            content: '图片绘制中，请稍后重试',
            showCancel: false
          })
        }
      }
    });
  },

  //分享到朋友圈提示弹框
  onSavePhoto: function() {
    var that = this;
    wx.saveImageToPhotosAlbum({
      filePath: that.data.shareImgPath,
      success(res) {
        console.log(res);
        wx.showModal({
          title: '图片已保存至相册',
          content: '去朋友圈和小伙伴分享您的战绩吧！',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#353435',
          success: function(res) {
            if (res.confirm) {
              that.setData({
                hiddenSave: true
              })
            }
          }
        })
      }
    });
  }



})
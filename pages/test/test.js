// pages/test/test.js
var netutil = require('../../utils/netutil.js')
var util = require('../../utils/util.js')
var constant = require('../../utils/constant.js')

let examPage = '../exam/exam';

Component({

  properties: {

  },

  data: {
    title: constant.STR_TEST,
    strTestTitle: constant.STR_TEST_TITLE,
    strTestStart: constant.STR_TEST_START,
    strTestCustomize: constant.STR_TEST_CUSTOMIZE
  },
  methods: {
    onStartTap: function () {
      util.openPage(examPage, null);
    },
    onCustomizeTap:function(){
      wx.showShareMenu({
        withShareTicket: true
      })
    }
  }

})
// pages/test/test.js
var util = require('../../utils/util.js')
var constant = require('../../utils/constant.js')

let addPage = '../add/add';
let customizePage = '../customize/customize';
let advicePage = '../advice/advice';

Component({

  properties: {

  },

  data: {
    title: constant.STR_HELP,
    buttons: constant.ARRAY_HELP_MENUS,
    shareBtn: constant.ARRAY_HELP_MENUS[0]
  },

  methods: {
    onBtnTap: function (e) {
      var position = parseInt(e.currentTarget.dataset.index);
      console.log(position);
      if (position == 0) {
        this.goAddPage();
      } else if (position == 1) {
      //   this.goCustomizePage();
      // } else if (position == 2) {
        this.goAdvicePage();
      } 
    },

    goAddPage: function () {
      util.openPage(addPage, null);
    },

    goCustomizePage: function () {
      util.openPage(customizePage, null);
    },

    goAdvicePage: function () {
      util.openPage(advicePage, null);
    }
  }

})
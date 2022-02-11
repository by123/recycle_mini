// pages/category/category.js
const db = wx.cloud.database()

Component({

  properties: {

  },
  /**
   * 页面的初始数据
   */
  data: {
    recycleSelect: true,
    residualSelect: false,
    householdSelect: false,
    hazardousSelect: false,
    currentTab: 0,
    datas: []
  },

  pageLifetimes: {
    show: function () {
      this.requestCategory();
    },
    hide: function () {
      // 页面被隐藏
    },
    resize: function (size) {
      // 页面尺寸变化
    }
  },
  methods: {
    onRecycleTap: function () {
      this.setData({
        recycleSelect: true,
        residualSelect: false,
        householdSelect: false,
        hazardousSelect: false,
        currentTab: 0,
      })
    },

    onHazardousTap: function () {
      this.setData({
        recycleSelect: false,
        residualSelect: false,
        householdSelect: false,
        hazardousSelect: true,
        currentTab: 1,
      })
    },

    onHouseholdTap: function () {
      this.setData({
        recycleSelect: false,
        residualSelect: false,
        householdSelect: true,
        hazardousSelect: false,
        currentTab: 2,
      })
    },

    onResidualTap: function () {
      this.setData({
        recycleSelect: false,
        residualSelect: true,
        householdSelect: false,
        hazardousSelect: false,
        currentTab: 3,
      })
    },

    onSwiperTabChange: function (e) {
      var position = e.detail.current;
      this.setData({
        currentTab: position,
      });
      if (position == 0) { this.onRecycleTap() }
      if (position == 1) { this.onHazardousTap() }
      if (position == 2) { this.onHouseholdTap() }
      if (position == 3) { this.onResidualTap() }
    },

    requestCategory: function () {
      var that = this;
      db.collection('categorys').get({
        success: function (res) {
          that.setData({
            datas: res.data,
          })
          console.log(res.data)
        }
      });
    }
  },

})
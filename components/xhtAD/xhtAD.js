Component({
  properties: {
    adData: Object,
    adID: null

  },
  attached: function () {
    this.setData({
      adID: this.dataset.id
    })
  },
  methods: {
    adLoad() {
      this.triggerEvent('adload')
    },
    clickAd() {
      this.triggerEvent('click')
    },
    navFail(e) {
      // console.log(e)
    },
    close() {
      this.triggerEvent('close')
    }
  }
});
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

/*获取设备信息*/
var getSystemInfo = function (result) {
  wx.getSystemInfo({
    success: function (res) {
      result(res);
    }
  });
}

/**
 * 是否为空字符串或数组
 */
const isEmpty = function (str) {
  if (Object.prototype.toString.call(str) === '[object Undefined]') {//空
    return true
  } else if (
    Object.prototype.toString.call(str) === '[object String]' ||
    Object.prototype.toString.call(str) === '[object Array]') { //字条串或数组
    return str.length == 0 ? true : false
  } else if (Object.prototype.toString.call(str) === '[object Object]') {
    return JSON.stringify(str) == '{}' ? true : false
  } else {
    return true
  }
}

/**跳转方法**/

var buildUrl = function (url, params) {
  if (isEmpty(params)) { return url; }
  url = url + "?";
  for (var index in params) {
    var item = params[index];
    url = url + item.key + "=" + item.value + "&";
  }
  url = url.slice(0, url.length - 1);
  console.log("跳转链接：" + url);
  return url;
}

/**跳转到下一页*/
const openPage = function(url, params) {
  wx.navigateTo({
    url: buildUrl(url, params)
  });
}

/**跳转到下一页，不需要返回*/
const openPageWithoutBack =  function (url, params) {
  wx.redirectTo({
    url: buildUrl(url, params)
  })
}

/**打开当前页，清除所有页*/
const reLunchPage = function(url, params) {
  setTimeout(function () {
    wx.reLaunch({
      url: buildUrl(url, params)
    });
  }, 200);
}

var shareContent = function () {
  return {
    title: '垃圾分类助手',
    path: 'pages/index/index',
    success: function (res) {
      console.log(res);
    },
    fail: function (res) {
      console.log(res);
    }
  }
}

module.exports = {
  formatTime,
  getSystemInfo,
  isEmpty,
  buildUrl,
  openPage,
  openPageWithoutBack,
  reLunchPage,
  shareContent
}

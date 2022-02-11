const db = wx.cloud.database()
const _ = db.command

//cid搜索垃圾类型
const queryCategory = function (cid, success) {
  db.collection('categorys').where({
    "cid": cid
  }).get({
    success: function (res) {
      success(res.data[0]);
    }
  });
}

//rid搜索垃圾详情
const queryRubbishDetail = function (rid, success) {
  db.collection('rubbish').where({
    "rid": rid
  }).get({
    success: function (res) {
      success(res.data[0]);
    }
  });
}

//名称搜索垃圾数据
const queryRubbish = function (value, index, success) {
  db.collection('rubbish').where(_.or([{
    "name": db.RegExp({
      regexp: value,
      options: 'i'
    })
  }, {
    "cname": db.RegExp({
      regexp: value,
      options: 'i'
    })
  }])).skip(index)
    .limit(20)
    .get({
      success: function (res) {
        success(res);
      }
    });
}

//随机获取10个数据
const queryTenRubbish = function (success) {
  var datas = [];
  var numbers = [];
  while (true) {
    numbers.push("" + Math.floor(Math.random() * 630));
    numbers = Array.from(new Set(numbers));
    if (numbers.length == 10) {
      break;
    }
  };
  console.log(numbers);
  db.collection('rubbish').where({
    rid: _.in(numbers)
  })
    .get({
      success: function (res) {
        console.log(res);
        success(res);
      },
      fail: function (res) {
        console.log(res);
      }
    });
}


module.exports = {
  queryRubbish,
  queryTenRubbish,
  queryRubbishDetail,
  queryCategory
}
function get (url, parameter) {
  return base(url, parameter, 'GET')
}

function post (url, parameter) {
  return base(url, parameter, 'POST')
}

function base (url, parameter, method) {
  return new Promise(((resolve, reject) => {
    wx.request({
      url:'https://www.wanandroid.com/'+url,
      ...parameter,
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        "cookie": wx.getStorageSync("cookie")
      },
      method,
      success: res => {
        if (res.data.errorCode === 0) {
          if (url === 'user/login' || url ==='user/register') {
            wx.setStorageSync("cookie", res.header['Set-Cookie'])
          }
          resolve(res.data)
        } else {
          reject(res.data)
        }

      },
      fail: err => {
        reject(err)
      }
    })
  }))

}

module.exports = {
  get: get,
  post: post
}


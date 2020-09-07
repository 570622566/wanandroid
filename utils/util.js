function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' +
    [hour, minute, second].map(formatNumber).join(':')
}

function getDate (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

function dayDiff (dateEnd) {
  const dateStart = new Date()

  return Math.floor(Math.abs(dateEnd - dateStart) / (1000 * 60 * 60 * 24))
}

function formatNumber (n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getNavHeight () {
  let menu = wx.getMenuButtonBoundingClientRect()
  let statusH = wx.getSystemInfoSync().statusBarHeight
  let titeBar = (menu.top - statusH) + menu.bottom
  return titeBar
}

function hasCache (key) {
  const value = wx.getStorageSync(key)
  if (value) {
    if (dayDiff(new Date(value['saveTime'])) > 1) {
      return false
    } else {
      return value['data']
    }
  } else {
    return false
  }
}

function setCache (key, data) {
  wx.setStorage({
    key: key,
    data: {
      'data': data,
      'saveTime': new Date().getTime()
    }
  })
}

function checkLogin () {
  const userCache = wx.getStorageSync('user')
  if (userCache) {
    return true
  } else {
    wx.showModal({
      title: '登录提示',
      content: '还没登录，是否登录？',
      cancelText: '取消',
      confirmText: '登录',
      success (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../login/index'
          })
        }
      }
    })
  }

}

function rpxTopx (rpx) {
  return rpx / 750 * wx.getSystemInfoSync().windowWidth

}

function pxTorpx (px) {
  return px * 750 / wx.getSystemInfoSync().windowWidth
}

module.exports = {
  formatTime: formatTime,
  getNavHeight: getNavHeight,
  rpxTopx: rpxTopx,
  pxTorpx: pxTorpx,
  dayDiff: dayDiff,
  getDate: getDate,
  hasCache: hasCache,
  setCache: setCache,
  checkLogin: checkLogin
}

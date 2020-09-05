const api = require('../../request/api.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    showLogin: true
  },

  onLoginClick () {
    wx.navigateTo({
      url: '/pages/login/index'
    })

  },
  onRankClick () {
    wx.navigateTo({
      url: '/pages/rank/index'
    })

  },
  onCoinClick () {
    wx.navigateTo({
      url: '/pages/coin/index'
    })

  },
  onShareClick () {
    this.checkLogin('/pages/share/index')
  },

  checkLogin (url) {
    const userCache = wx.getStorageSync('user')
    if (userCache) {
      wx.navigateTo({
        url
      })
    } else {
      wx.showModal({
        title: '登录提示',
        content: '还没登录，是否登录？',
        cancelText: '取消',
        confirmText: '登录',
        success (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/index'
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const userCache = wx.getStorageSync('user')
    this.setData({
      showLogin: !userCache
    })
    if (userCache) {
      this.data.user.nickName = userCache.data.data.nickname
      this.getUserInfo()
    }
  },
  async getUserInfo () {
    const resp = await api.getUserInfo()
    const user = Object.assign(this.data.user, resp.data)
    this.setData({
        user
      }
    )
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

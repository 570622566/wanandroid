const api = require('../../request/api.js')
Page({
  title: '',
  webUrl: '',
  /**
   * 页面的初始数据
   */
  data: {},

  onTitleBlur (e) {
    this.title = e.detail.value
  },
  onWebUrlBlur (e) {
    this.webUrl = e.detail.value
  },
  onSubmitClick () {

    if (!this.title) {
      this.showFailToast('请输入标题')
      return
    }
    if (!this.webUrl) {
      this.showFailToast('请输入网站地址')
      return
    }
    this.addShareArticle()
  },

  showFailToast (title) {
    wx.showToast({
      title,
      mask: true,
      image: '../../assets/icon_fail.png',
      duration: 1500
    })
  },

  async addShareArticle () {
    wx.showLoading({
      title: '加载中'
    })
    try {
      await api.addShareArticle(this.title, this.webUrl)
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        mask: true,
        duration: 1500
      })
    } catch (e) {
      this.showFailToast(e.errorMsg)
    }
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  }

  ,

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  }
  ,

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }
  ,

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  }
  ,

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  }
  ,

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  }
  ,

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
  ,

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

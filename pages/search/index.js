// pages/search/index.js
const api = require('../../request/api.js')
const utils = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotKeys: [],
    hotKey: '',
    hisKeys: [],
    clearDialogShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCache()
    this.getHisKeys()
  },

  getHisKeys () {
    const hisKeys = utils.hasCache('hisKey')
    if (hisKeys) {
      this.setData({
        hisKeys: hisKeys
      })
    }
  },
  async getCache () {
    const hotKeys = utils.hasCache('hotkey')
    if (hotKeys) {
      this.getHotKeys(hotKeys, false)
    } else {
      const resp = await api.getHotKeys()
      this.getHotKeys(resp, true)
    }
  },

  getHotKeys (resp, save) {
    if (save) {
      utils.setCache('hotkey', resp)
    }
    this.setData({
        hotKeys: resp.data
      }
    )
  },

  onShowClearDialog (e) {
    if (e.detail.index === 1) {
      wx.removeStorage({ key: 'hisKey' })
      this.data.hisKeys = []
    }
    this.setData({
      clearDialogShow: false,
      hisKeys: this.data.hisKeys
    })
  },
  onClearClick () {
    this.setData({
      clearDialogShow: true
    })
  },

  onSearchKeyClick (e) {
    this.navigateTo(e.currentTarget.dataset.value.trim())

  },
  onSearch () {
    this.navigateTo(this.data.hotKey)
  },
  onSearchClick () {
    this.navigateTo(this.data.hotKey)
  },
  onChange (e) {
    this.setData({
      hotKey: e.detail
    })
  },

  navigateTo (value) {
    if (!value) {
      return
    }
    this.data.hisKeys.unshift(value)
    let hisKeys = this.data.hisKeys.filter(((value1, index, array) => {
      return index === array.indexOf(value1)
    }))
    this.setData({
        hisKeys: hisKeys
      }
    )
    utils.setCache('hisKey', this.data.hisKeys)

    wx.navigateTo({
      url: `../searchResult/index?value=${value}`
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

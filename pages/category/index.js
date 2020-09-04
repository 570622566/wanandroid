// pages/category/index.js

const api = require('../../request/api.js')
const utils = require('../../utils/util.js')
Page({
  itemsWidth: [],
  scrollViewWidth: 0,
  screenWidth: 0,
  /**
   * 页面的初始数据
   */
  data: {
    activityTab: 0,
    navHeight: 60,
    scrollHeight: 0,
    itemActivity: 0,
    scrollLeft: 0,
    categoryTabs: []
  },

  async getCacheTabs () {
    const tabs = utils.hasCache('tabs')
    if (tabs) {
      this.dealCategoryTab(tabs, false)
    } else {
      const resp = await api.getCategoryTab()
      this.dealCategoryTab(resp, true)
    }

  },

  dealCategoryTab (resp, save) {
    if (save) {
      utils.setCache('tabs', resp)
    }
    const newData = resp.data.map((value, index, arr) => {
      value.name = value.name.replace('&amp;', '&')
      return value
    })
    this.setData({
      categoryTabs: newData
    })
    if (this.data.categoryTabs.length > 0) {
      this.selectComponent(`#item-0`).getCurrentData()
    }
    this.getItemswidth()
  },

  getItemswidth () {
    this.itemsWidth.clear
    const that = this
    wx.createSelectorQuery().
      selectAll('.tab-item').
      boundingClientRect(function (rects) {
        that.itemsWidth = rects.map((currentValue) => ({
          width: currentValue.width,
          offsetLeft: currentValue.left
        }))
      }).exec()

  },

  onClickItem (e) {
    this.activityBarCenter(e.currentTarget.dataset.index)
  },

  activityBarCenter (index) {
    const offsetLeft = this.itemsWidth[index].offsetLeft - this.screenWidth /
      2 +
      this.itemsWidth[index].width / 2
    this.setData({
      itemActivity: index,
      scrollLeft: offsetLeft
    })
  },

  swiperChange (e) {
    this.activityBarCenter(e.detail.current)
    this.selectComponent(`#item-${e.detail.current}`).getCurrentData()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navHeight: utils.getNavHeight(),
      scrollHeight: wx.getSystemInfoSync().windowHeight - utils.getNavHeight() -
        utils.rpxTopx(60)
    })
    this.screenWidth = wx.getSystemInfoSync().screenWidth
    this.getCacheTabs()
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

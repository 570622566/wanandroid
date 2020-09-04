const utils = require('../../utils/util.js')
const api = require('../../request/api.js')

Page({
  conViewHeights: [],
  distance: 0,
  itemsHeight: [],
  /**
   * 页面的初始数据
   */
  data: {
    navHeight: 60,
    scrollHeight: 0,
    activeKey: 0,
    tixiMenus: [],
    tixiItems: [],
    intoView: 0,
    scrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navHeight: utils.getNavHeight(),
      scrollHeight: wx.getSystemInfoSync().windowHeight - utils.getNavHeight()
    })
    this.getCache()
  },

  async getCache () {
    const tixi = utils.hasCache('tixi')
    if (tixi) {
      this.dealTixi(tixi, false)
    } else {
      const resp = await api.getTixi()
      this.dealTixi(resp, true)
    }

  },

  dealTixi (resp, save) {
    if (save) {
      utils.setCache('tixi', resp)
    }
    let children = []
    const menuTitles = resp.data.map(((value, index, array) => {
      children.push({
        children: value.children,
        id: value.id
      })
      return {
        title: value.name,
        id: value.id
      }
    }))
    this.setData({
      tixiMenus: menuTitles,
      tixiItems: children,
      activeKey: 0
    })
    this.getItemsHeight()
    this.getLeftItemsHeight()
  },

  getItemsHeight () {
    this.conViewHeights.clear
    const that = this
    wx.createSelectorQuery().
      selectAll('.category-container').
      boundingClientRect(function (rects) {
        rects.reduce((accumulator, currentValue) => {
          that.conViewHeights.push(accumulator + currentValue.height)
          return accumulator + currentValue.height
        }, 0)
      }).exec()
  },

  getLeftItemsHeight () {
    this.itemsHeight.clear
    const that = this
    wx.createSelectorQuery().
      selectAll('.left-item').
      boundingClientRect(function (rects) {
        that.itemsHeight = rects.map((currentValue) => ({
          height: currentValue.height,
          offsetTop: currentValue.top
        }))
      }).exec()
  },

  onMenuClick (e) {
    this.activityLeftBarCenter(e.currentTarget.dataset.index)
    this.setData({
      activeKey: e.currentTarget.dataset.index,
      intoView: e.currentTarget.dataset.index
    })
  },
  onTixiClick (e) {
    wx.navigateTo({
      url: `../tixiDetail/index?cid=${e.currentTarget.dataset.cid}&title=${e.currentTarget.dataset.name}`
    })
  },
  onRightScroll (e) {
    if (this.conViewHeights.length === 0) {
      return
    }
    let scrollTop = e.detail.scrollTop
    let current = this.data.activeKey

    if (scrollTop >= this.distance) { //页面向上滑动
      //如果右侧当前可视区域最底部到顶部的距离 超过 当前列表选中项距顶部的高度（且没有下标越界），则更新左侧选中项
      if (current + 1 < this.conViewHeights.length && scrollTop >
        this.conViewHeights[current]) {
        let activityKey = this.data.activeKey = current + 1
        this.activityLeftBarCenter(activityKey)
        this.setData({
          activeKey: activityKey
        })
      }

    } else { //页面向下滑动
      //如果右侧当前可视区域最顶部到顶部的距离 小于 当前列表选中的项距顶部的高度，则更新左侧选中项
      if (current - 1 >= 0 && scrollTop + 10 <=
        this.conViewHeights[current - 1]) {
        let activityKey = this.data.activeKey = current - 1
        this.activityLeftBarCenter(activityKey)
        this.setData({
          activeKey: activityKey
        })
      }
    }
    //更新到顶部的距离
    this.distance = scrollTop
  },

  activityLeftBarCenter (index) {
    const scrollTop = this.itemsHeight[index].offsetTop -
      this.data.scrollHeight /
      2 + this.itemsHeight[index].height / 2
    this.setData({
      activeKey: index,
      scrollTop: scrollTop
    })
  },
  onScrolltoupper () {
    this.distance = 0
    this.setData({
      activeKey: 0
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

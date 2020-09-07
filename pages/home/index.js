const api = require('../../request/api.js')
const utils = require('../../utils/util.js')

Page({
  page: 0,
  isShowLoading: false,
  pageCount: 1,
  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    topArticles: [],
    hotsArticles: [],
    showFooter: false,
    navHeight: 60
  },

  topCollect (e) {

    console.log(e)
    utils.checkLogin()
  },
  hotCollect (e) {
    console.log(e)
  },

  async getBanner () {
    const banners = await api.getBanner()
    this.setData({
        banners: banners.data
      }
    )
  },
  async getTopArticles () {
    const getTopArticles = await api.getTopArticles()
    this.setData({
      topArticles: getTopArticles.data
    })

  },
  async getHotsArticles () {
    if (this.isShowLoading) {
      return
    }
    if (this.page > this.pageCount) {
      this.data.showFooter = false
      return
    }
    this.isShowLoading = true
    const getHotsArticles = await api.getHotsArticles(this.page)
    this.pageCount = getHotsArticles.data.pageCount
    this.isShowLoading = false
    this.page = ++this.page
    this.setData({
      showFooter: false,
      hotsArticles: this.data.hotsArticles.concat(
        getHotsArticles.data.datas)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navHeight: utils.getNavHeight()
    })
    this.initData()
  },

  onBannerClick: function (e) {
    let url = encodeURIComponent(e.currentTarget.dataset.url)
    wx.navigateTo({
      url: `../articleDetail/index?url=${url}`
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.page = 0
    this.isShowLoading = false
    this.pageCount = 1
    this.setData({
      banners: [],
      topArticles: [],
      hotsArticles: [],
      showFooter: false
    })
    this.initData()
  },

  initData () {
    this.getBanner()
    this.getTopArticles()
    this.getHotsArticles()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e) {
    this.setData({
      showFooter: true
    })
    this.getHotsArticles()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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

  }
})

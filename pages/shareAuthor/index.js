const api = require('../../request/api.js')

Page({
  page: 1,
  isShowLoading: false,
  pageCount: 1,
  userId: 0,
  /**
   * 页面的初始数据
   */
  data: {
    authorArticles: [],
    authorInfo: {},
    headerImg: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.shareUser
    })
    this.data.authorInfo.nickName = options.shareUser
    this.userId = options.userId
    this.getShareUserArticle()
    this.getHeader()
  },

  getHeader () {
    const headers = [
      '../../assets/icon_header1.png',
      '../../assets/icon_header2.png',
      '../../assets/icon_header3.png',
      '../../assets/icon_header4.png',
      '../../assets/icon_header5.png'
    ]
    this.setData({
      headerImg: headers[this.getRandomInt(5)]
    })

  },
  getRandomInt (max) {
    return Math.floor(Math.random() * Math.floor(max))
  },

  async getShareUserArticle () {
    if (this.isShowLoading) {
      return
    }
    if (this.page > this.pageCount) {
      return
    }
    this.isShowLoading = true
    const resp = await api.getShareUserArticle(this.userId, this.page)
    ++this.page
    this.pageCount = resp.data.shareArticles.pageCount
    this.data.authorInfo.total = resp.data.shareArticles.total
    this.isShowLoading = false
    this.setData({
      authorInfo: { ...this.data.authorInfo, ...resp.data.coinInfo },
      authorArticles: this.data.authorArticles.concat(
        resp.data.shareArticles.datas)
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
    this.getAuthorArticle()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

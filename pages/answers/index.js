const api = require('../../request/api.js')
const utils = require('../../utils/util.js')

Page({
  page: 1,
  isShowLoading: false,
  pageCount: 1,
  /**
   * 页面的初始数据
   */
  data: {
    answers: [],
    navHeight: 60
  },

  async getAnswers () {
    if (this.isShowLoading) {
      return
    }
    if (this.page > this.pageCount) {
      this.isShowLoading = false
      return
    }
    this.isShowLoading = true
    let getAnswers = await api.getAnswers(this.page)
    ++this.page
    this.isShowLoading = false
    this.pageCount = getAnswers.data.pageCount
    this.setData({
      answers: this.data.answers.concat(
        getAnswers.data.datas)
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(utils.getNavHeight())
    this.setData({
      navHeight: utils.getNavHeight()
    })
    this.getAnswers()
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
    this.getAnswers()

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

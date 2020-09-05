// pages/coin/index.js
const api = require('../../request/api.js')
Page({
  page: 1,
  pageCount: 1,
  isLoading: false,
  /**
   * 页面的初始数据
   */
  data: {
    coins: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCoinList()
  },

  async getCoinList () {

    if (this.isLoading) {
      return
    }
    if (this.page > this.pageCount) {
      return
    }
    // "2020-09-04 09:23:37 签到 , 积分：10 + 3"
    this.isLoading = true
    const resp = await api.getCoinList(this.page)
    const newResp = resp.data.datas.map((value, index, array) => {
      return ({
        desc: value.desc.slice(0, value.desc.indexOf(',')),
        coinCount: value.coinCount
      })
    })
    console.log(resp)
    ++this.page
    this.pageCount = resp.data.pageCount
    this.isLoading = false
    this.setData({
      coins: this.data.coins.concat(newResp)
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

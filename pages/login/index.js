const api = require('../../request/api.js')
const utils = require('../../utils/util.js')

Page({
  title: ['去注册 >', '< 去登录'],
  userName: '',
  passWord: '',
  reUserName: '',
  rePassWord: '',
  repeatPassWord: '',
  /**
   * 页面的初始数据
   */
  data: {
    leadTip: '去注册 >',
    currentIndex: 0

  },
  onCloseClick () {
    wx.navigateBack()
  },
  onChangeClick () {
    this.setData({
      currentIndex: this.data.currentIndex === 0 ? 1 : 0
    })
  },
  onLoginChange (e) {
    this.setData({
      currentIndex: e.detail.current,
      leadTip: this.title[e.detail.current]
    })

  },
  onUserNameBlur (e) {
    this.userName = e.detail.value
  },
  onUserPassWordBlur (e) {
    this.passWord = e.detail.value
  },
  onReUserNameBlur (e) {
    this.reUserName = e.detail.value
  },
  onRePassWordBlur (e) {
    this.rePassWord = e.detail.value

  },
  onRepeatPassWordBlur (e) {
    this.repeatPassWord = e.detail.value
  },
  onLoginClick () {

    if (!this.userName) {
      this.showFailToast('请输入用户名')
      return
    }
    if (!this.passWord) {
      this.showFailToast('请输入密码')
      return
    }
    this.login()
  },
  onRegisterClick () {

    if (!this.reUserName) {
      this.showFailToast('请输入用户名')
      return
    }
    if (!this.rePassWord) {
      this.showFailToast('请输入密码')
      return
    }
    if (!this.repeatPassWord) {
      this.showFailToast('请输入确认密码')
      return
    }
    if (this.repeatPassWord !== this.rePassWord) {
      this.showFailToast('密码不一致')
      return
    }
    this.register()
  },

  async login () {
    wx.showToast({
      title: '登录中。。。',
      icon: 'loading',
      mask: true,
      duration: 2000
    })
    try {
      const resp = await api.login(this.userName, this.passWord)
      utils.setCache('user', resp)
      wx.hideToast()
      wx.navigateBack()
    } catch (e) {
      this.showFailToast(e.errorMsg)
    }

  },
  async register () {
    wx.showToast({
      title: '注册中。。。',
      icon: 'loading',
      mask: true,
      duration: 2000
    })
    try {
      const resp = await api.register(this.reUserName, this.rePassWord,
        this.repeatPassWord)
      utils.setCache('user', resp)
      wx.hideToast()
      wx.navigateBack()
    } catch (e) {
      this.showFailToast(e.errorMsg)
    }

  },

  showFailToast (title) {
    wx.showToast({
      title,
      mask: true,
      image: '../../assets/icon_fail.png',
      duration: 1500
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

// componnets/search/search.js
const utils = require('../../utils/util.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    searchTop: 0,
    searchLeft: 0,
    searchHeight: 0,
    searchWidth: 0,
    navHeight: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getSearchHeight () {
      let menu = wx.getMenuButtonBoundingClientRect()
      let marginRight = wx.getSystemInfoSync().windowWidth - menu.right
      this.setData({
        navHeight: utils.getNavHeight(),
        searchTop: menu.top,
        searchLeft: wx.getSystemInfoSync().windowWidth - menu.right,
        searchHeight: menu.height,
        searchWidth: wx.getSystemInfoSync().windowWidth -
          (menu.right - menu.left) - marginRight * 3
      })
    },
    searchClick () {

      wx.navigateTo({
        url: '../search/index'
      })
    },
    onMenuClick () {
      wx.navigateTo({
        url: '../../pages/me/index'
      })
    },

  },
  lifetimes: {
    attached () {
      this.getSearchHeight()
    },

  },

})

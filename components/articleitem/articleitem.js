// components/articleitem/articleitem.js
const api = require('../../request/api.js')
const util = require('../../utils/util.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    article: {
      type: Object,
      value: {}
    },
    isTop: {
      type: Boolean,
      value: false
    },
    interceptTap: {
      type: Boolean,
      value: false
    },
    showCollect: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    articleDesc: []
  },
  lifetimes: {
    ready () {
      const { desc } = this.data.article
      this.setData(
        {
          articleDesc: this.delHtmlTag(desc)
        }
      )

    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

    onNavigatorClick: function (e) {
      let url = encodeURIComponent(e.currentTarget.dataset.link)
      wx.navigateTo({
        url: `../articleDetail/index?url=${url}`
      })
    },
    delHtmlTag (str) {
      let reg = RegExp('<[^>]+>', 'g')
      let result = str.replace(reg, '')
      return result
    },
    onAuthorClick () {
      // superChapterId
      let userId = this.data.article.userId
      if (userId === -1) {
        let shareUser = this.data.article.shareUser ||
          wx.navigateTo({
            url: `../author/index?author=${this.data.article.author}`
          })
      } else {
        wx.navigateTo({
          url: `../shareAuthor/index?userId=${userId}&shareUser=${this.data.article.shareUser}`
        })
      }

    },
    onCategoryClick (e) {
      wx.navigateTo({
        url: `../tixiDetail/index?cid=${e.currentTarget.dataset.cid}&title=${e.currentTarget.dataset.name}`
      })
    },

    onCollectClick () {
      if (util.checkLogin()) {
        if (this.data.interceptTap) {
          this.triggerEvent('collectEvent')
        } else {
          this.collectManager()
        }
      }

    },
    async collectManager () {
      let resp
      if (this.data.article.collect) {
        resp = await api.unCollect(this.data.article.id)
        this.data.article.collect = false
      } else {
        resp = await api.addCollect(this.data.article.id)
        this.data.article.collect = true
      }
      this.setData({
        article: this.data.article
      })
      this.triggerEvent('collectEvent')
    }

  }
})

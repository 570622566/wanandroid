// components/articleitem/articleitem.js
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
      wx.navigateTo({
        url: `../login/index`
      })
    }

  }
})

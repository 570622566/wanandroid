const api = require('../../request/api.js')

Component({

  properties: {
    itemId: {
      type: Number,
      value: 0
    },
    scrollHeight: {
      type: Number,
      value: 0
    }
  },
  data: {
    objItems: [],
    page: 1,
    pageCount: 1,
    isLoading: false

  },
  methods: {
    async getProjectList () {
      if (this.data.isLoading) {
        return
      }
      this.data.isLoading = true
      const resp = await api.getProjectList(this.data.itemId, this.data.page)
      const pageCount = resp.data.pageCount
      const objItems = resp.data.datas
      this.data.isLoading = false
      this.data.pageCount = pageCount
      ++this.data.page
      this.setData({
        objItems: this.data.objItems.concat(objItems)
      })

    },
    onScrolltolower () {
      if (this.data.page <= this.data.pageCount) {
        this.getProjectList()
      }

    },
    getCurrentData () {
      if (this.data.objItems.length <= 0) {
        this.getProjectList()
      }
    }

  }

})

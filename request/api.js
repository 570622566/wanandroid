const request = require('./httprequest.js')

/**
 * 获取banner列表
 * @returns {Promise | Promise<unknown>}
 */
function getBanner () {
  return request.get(`banner/json`)
}

/**
 *获取置顶文章列表
 * @returns {Promise | Promise<unknown>}
 */
function getTopArticles () {
  return request.get(`article/top/json`)
}

/**
 * 获取首页文章列表
 * @param page
 * @returns {Promise | Promise<unknown>}
 */
function getHotsArticles (page) {
  return request.get(`article/list/${page}/json`)
}

/**
 * 获取热点词
 * @returns {Promise | Promise<unknown>}
 */
function getHotKeys () {
  return request.get(`hotkey/json`)

}

/**
 * 搜索
 * @param page
 * @param keyWord
 * @returns {Promise | Promise<unknown>}
 */
function searchResult (page, keyWord) {

  const parameter = {
    data: {
      k: keyWord
    }
  }
  return request.post(`article/query/${page}/json`, parameter)

}

/**
 * 问答
 * @param page
 * @returns {Promise | Promise<unknown>}
 */
function getAnswers (page) {
  return request.get(`wenda/list/${page}/json`)
}

/**
 * 体系数据
 * @returns {Promise | Promise<unknown>}
 */
function getTixi () {
  return request.get(`tree/json`)
}

/**
 * 知识体系下的文章列表
 * @param page
 * @param cid
 * @returns {Promise | Promise<unknown>}
 */
function getTixiList (page, cid) {
  return request.get(`article/list/${page}/json?cid=${cid}`)
}

/**
 * 项目分类
 * @returns {Promise | Promise<unknown>}
 */
function getCategoryTab () {
  return request.get(`project/tree/json`)
}

/**
 * 某一个分类下项目列表数据
 * @param cid
 * @param page
 * @returns {Promise | Promise<unknown>}
 */
function getProjectList (cid, page) {
  // https://www.wanandroid.com/project/list/1/json?cid=294
  return request.get(`project/list/${page}/json?cid=${cid}`)
}

/**
 * 导航数据
 * @returns {Promise | Promise<unknown>}
 */
function getWebNav () {
  // https://www.wanandroid.com/navi/json
  return request.get(`navi/json`)
}

/**
 * 分享人对应列表数据
 * @param shareUserId
 * @param page
 * @returns {Promise | Promise<unknown>}
 */
function getShareUserArticle (shareUserId, page) {
  // https://wanandroid.com/user/2/articles/1
  return request.get(`user/${shareUserId}/share_articles/${page}/json`)
}

/**
 * 按照作者昵称搜索文章列表
 * @param author
 * @param page
 * @returns {Promise | Promise<unknown>}
 */
function getAuthorArticle (author, page) {
  // https://www.wanandroid.com/article/list/0/json?author=xiaoyang
  return request.get(`article/list/${page}/json?author=${author}`)
}

/**
 * 登录
 * @param userName
 * @param passWord
 * @returns {Promise<unknown>}
 */
function login (userName, passWord) {
  const parameter = {
    data: {
      username: userName,
      password: passWord
    }
  }
  return request.post(`user/login`, parameter)
}

/**
 * 注册
 * @param userName
 * @param passWord
 * @param rePassWord
 * @returns {Promise<unknown>}
 */
function register (userName, passWord, rePassWord) {
  const parameter = {
    data: {
      username: userName,
      password: passWord,
      repassword: rePassWord
    }
  }
  return request.post(`user/register`, parameter)
}

/**
 * 退出
 * @param userName
 * @param passWord
 * @param rePassWord
 * @returns {Promise<unknown>}
 */
function logout () {
  return request.get(`user/logout/json`)
}

/**
 * 获取用户信息
 * @returns {Promise | Promise<unknown>}
 */
function getUserInfo () {
  return request.get(`lg/coin/userinfo/json`)
}

/**
 * 排行榜
 * @returns {Promise | Promise<unknown>}
 */

function getRank (page) {
  return request.get(`coin/rank/${page}/json`)
}

/**
 * 获取个人积分列表详情
 * @param page
 * @returns {Promise | Promise<unknown>}
 */
function getCoinList (page) {
  return request.get(`lg/coin/list/${page}/json`)
}

/**
 * 获取自己分享的文章列表
 * @param page
 * @returns {Promise | Promise<unknown>}
 */
function getMyArticles (page) {
  return request.get(`user/lg/private_articles/${page}/json`)
}

/**
 * 添加文章
 * @param title
 * @param link
 * @returns {Promise | Promise<unknown>}
 */
function addShareArticle (title, link) {
  const parameter = {
    data: {
      title,
      link
    }
  }
  return request.post(`lg/user_article/add/json`, parameter)
}

/**
 * 添加收藏
 * @param title
 * @param link
 * @returns {Promise<unknown>}
 */
function addCollect (articleId) {
  return request.post(`lg/collect/${articleId}/json`)
}

/**
 * 取消收藏
 * @param articleId
 * @returns {Promise<unknown>}
 */
function unCollect (articleId) {
  return request.post(`lg/uncollect_originId/${articleId}/json`)
}

/**
 * 取消我的收藏列表的收藏
 * @param articleId
 * @param originId
 * @returns {Promise<unknown>}
 */
function unMyCollect (articleId, originId) {
  const parameter = {
    data: {
      originId
    }
  }
  return request.post(`lg/uncollect/${articleId}/json`, parameter)
}

/**
 * 我的收藏列表
 * @param page
 * @returns {Promise | Promise<unknown>}
 */
function getMyCollects (page) {
  return request.get(`lg/collect/list/${page}/json`)
}

module.exports = {
  getBanner: getBanner,
  getTopArticles: getTopArticles,
  getHotsArticles: getHotsArticles,
  getHotKeys: getHotKeys,
  searchResult: searchResult,
  getAnswers: getAnswers,
  getTixi: getTixi,
  getTixiList: getTixiList,
  getCategoryTab: getCategoryTab,
  getProjectList: getProjectList,
  getWebNav: getWebNav,
  getAuthorArticle: getAuthorArticle,
  getShareUserArticle: getShareUserArticle,
  login: login,
  register: register,
  logout: logout,
  getUserInfo: getUserInfo,
  getRank: getRank,
  getCoinList: getCoinList,
  getMyArticles: getMyArticles,
  addShareArticle: addShareArticle,
  addCollect: addCollect,
  unCollect: unCollect,
  unMyCollect: unMyCollect,
  getMyCollects:getMyCollects
}

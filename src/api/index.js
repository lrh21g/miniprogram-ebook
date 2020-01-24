import { get, post } from '../utils/request'
import { CID, APP_ID, APP_SECRET } from '../utils/const'

const API_PREFIX = 'https://test.youbaobao.xyz:18081'

export function getHomeData (openId) {
  return get(`${API_PREFIX}/book/home/v2`, { openId })
}

export function getHomeSectionData (key) {
  return get(`${API_PREFIX}/book/home/${key}/v2`)
}

export function getCategoryList () {
  return get(`${API_PREFIX}/book/category/list/v2`)
}

export function getDetailData (openId, fileName) {
  return get(`${API_PREFIX}/book/detail`, { fileName, openId })
}

export function getDetailContents (fileName) {
  return get(`${API_PREFIX}/book/contents`, { fileName })
}

export function getShelf (openId, fileName) {
  const params = {}
  openId && (params.openId = openId)
  fileName && (params.fileName = fileName)
  console.log(params)
  return get(`${API_PREFIX}/book/shelf/get`, params)
}

export function saveShelf (shelf) {
  return get(`${API_PREFIX}/book/shelf/save`, { shelf: encodeURIComponent(JSON.stringify(shelf)) })
}

export function removeShelf (shelf) {
  return get(`${API_PREFIX}/book/shelf/remove`, { shelf: encodeURIComponent(JSON.stringify(shelf)) })
}

export function search (params) {
  if (params.keyword) {
    params.keyword = encodeURIComponent(params.keyword)
  }
  if (!params.pageSize) {
    params.pageSize = 20
  }
  if (!params.page) {
    params.page = 1
  }
  return get(`${API_PREFIX}/book/search`, params)
}

export function searchBook (params) {
  if (params.publisher) {
    params.publisher = encodeURIComponent(params.publisher)
  }
  if (params.author) {
    params.author = encodeURIComponent(params.author)
  }
  if (params.category) {
    params.category = encodeURIComponent(params.category)
  }
  if (!params.pageSize) {
    params.pageSize = 20
  }
  if (!params.page) {
    params.page = 1
  }
  return get(`${API_PREFIX}/book/search-list`, params)
}

export function hotSearch () {
  return get(`${API_PREFIX}/book/hot-search`)
}

export function getOpenId (code) {
  return get(`${API_PREFIX}/openId/get`, {
    appId: APP_ID,
    secret: APP_SECRET,
    code
  })
}

export function getAlipayOpenId (appId, code) {
  return get(`${API_PREFIX}/openId/get/alipay`, { appId, code })
}

export function register (openId, user) {
  return post(`${API_PREFIX}/user/register`, { openId, ...user, platform: mpvuePlatform })
}

export function rank ({ openId, fileName, rank }) {
  return get(`${API_PREFIX}/book/rank/save`, { openId, fileName, rank })
}

export function day (openId) {
  return get(`${API_PREFIX}/user/day`, { openId })
}

export function hasSignToday (openId) {
  return get(`${API_PREFIX}/user/hasSignToday`, { openId })
}

export function sign (openId) {
  return get(`${API_PREFIX}/user/sign`, { openId })
}

export function markdown () {
  return get(`${API_PREFIX}/book/md`)
}

export function getExerciseSet (cid = CID) {
  return get(`${API_PREFIX}/exercise/set/get`, { cid })
}

export function getExerciseChapter (exSetId, cid = CID) {
  return get(`${API_PREFIX}/exercise/chapter/get`, { cid, exSetId })
}

export function getExercise (exSetId, chapterId, cid = CID) {
  return get(`${API_PREFIX}/exercise/get`, { cid, exSetId, chapterId })
}

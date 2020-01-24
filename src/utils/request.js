import { handleError } from './index' // 引入请求校验函数（判断是否成功）

function createFly () {
  if (mpvuePlatform === 'wx') {
    const Fly = require('flyio/dist/npm/wx')
    return new Fly()
  }
  return null
}

// Get请求
export function get (url, params = {}) {
  const fly = createFly()
  if (fly) {
    return new Promise((resolve, reject) => {
      fly.get(url, params).then(response => {
        console.log('POST request response', response)
        resolve(response)
      }).catch(err => {
        console.log('POST request err', err)
        handleError(err)
        reject(err)
      })
    })
  }
}

// POST请求
export function post (url, params = {}) {
  const fly = createFly()
  if (fly) {
    return new Promise((resolve, reject) => {
      fly.post(url, params).then(response => {
        console.log('GET request response', response)
      }).catch(err => {
        console.log('GET request err', err)
        handleError(err)
        reject(err)
      })
    })
  }
}

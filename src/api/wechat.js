import { getOpenId, getAlipayOpenId } from './index'
import { handleError } from '../utils'
import { setError } from '../utils/error'

function adapter (fn, params) {
  return fn[mpvuePlatform] && fn[mpvuePlatform](params)
}

export function getUserOpenId (cb) {
  const wx = () => {
    mpvue.login({
      success: function (res) {
        console.log('微信登陆 res：', res)
        if (res.code) {
          getOpenId(res.code).then(response => {
            if (handleError(response)) {
              const openId = response.data.data.openid
              const sessionKey = response.data.data.session_key
              setStorageSync('openId', openId)
              setStorageSync('session_key', sessionKey)
              cb && cb(openId)
            }
          }).catch(err => {
            console.log('getOpenId err', err)
          })
        } else {
          console.log('获取用户登录状态失败：', res.errMsg)
          setError('获取用户登录状态失败！')
        }
      },
      fail () {
        setError('获取openId失败！')
      }
    })
  }
  const my = () => {
    mpvue.getAuthCode({
      scopes: 'auth_user', // 主动授权（弹框）：auth_user，静默授权（不弹框）：auth_base
      success: async (res) => {
        console.log('getOpenId', res)
        if (res.authCode) {
          const code = res.authCode
          const appId = ''
          const response = await getAlipayOpenId(appId, code)
          if (handleError(response)) {
            const openId = response.data.data.openid
            const sessionKey = response.data.data.session_key
            setStorageSync('openId', openId)
            setStorageSync('session_key', sessionKey)
            cb && cb(openId)
          }
        } else {
          setError('获取openId失败！')
        }
      },
      fail: () => {
        setError('获取openId失败！')
      }
    })
  }
  adapter({ wx, my })
}

export function showLoading (params) {
  const wx = () => {
    const { title } = params
    mpvue.showLoading({ title })
  }
  const my = () => {
    const { title: content } = params
    mpvue.showLoading({ content })
  }
  adapter({ wx, my })
}

export function hideLoading () {
  mpvue.hideLoading()
}

// 判读小程序是否获取权限
export function getSetting (authorize, onSuccess, onFail) {
  const wx = (res) => {
    if (res.authSetting[`scope.${authorize}`]) {
      onSuccess(res)
    } else {
      onFail(res)
    }
  }
  const my = (res) => {
    if (res.authSetting[authorize]) {
      onSuccess(res)
    } else {
      onFail(res)
    }
  }
  mpvue.getSetting({
    success: (res) => {
      adapter({ wx, my }, res)
    },
    fail: () => {
      setError('获取权限失败！')
    }
  })
}

export function getUserInfo (onSuccess, onFail) {
  const wx = () => {
    mpvue.getUserInfo({
      success (res) {
        const { userInfo } = res
        console.log('getUserInfo', userInfo)
        onSuccess(userInfo)
      },
      fail () {
        onFail ? onFail() : setError('获取用户信息失败！')
      }
    })
  }
  const my = () => {
    mpvue.getAuthUserInfo({
      success (res) {
        console.log('getAuthUserInfo res before', res)
        res.avatarUrl = res.avatar || res.avatarUrl
        delete res.avatar
        console.log('getOpenUserInfo res after', res)
        onSuccess(res)
      },
      fail () {
        onFail ? onFail() : setError('获取用户信息失败！')
      }
    })
  }
  adapter({ wx, my })
}

export function setStorageSync (key, data) {
  console.log('setStorageSync', key, data)
  const wx = () => {
    mpvue.setStorageSync(key, data)
  }
  const my = () => {
    mpvue.setStorageSync({ key, data })
  }
  adapter({ wx, my })
}

export function getStorageSync (key, data) {
  const wx = () => {
    return mpvue.getStorageSync(key)
  }
  const my = () => {
    const result = mpvue.getStorageSync({ key })
    return (result && result.data) || null
  }
  const result = adapter({ wx, my })
  console.log('getStorageSync', key, result)
  return result
}

export function setNavigationBar ({ title }) {
  const wx = () => {
    mpvue.setNavigationBarTitle({ title })
  }
  const my = () => {
    mpvue.setNavigationBar({ title })
  }
  adapter({ wx, my })
}

export function showToast (title, success = false) {
  adapter({
    wx () {
      success ? mpvue.showToast({ title }) : mpvue.showToast({ title, icon: 'none' })
    },
    my () {
      mpvue.showToast({
        type: success ? 'success' : 'none',
        content: title
      })
    }
  })
}

export function showModal ({ title, content, callback }) {
  adapter({
    wx () {
      mpvue.showModal({
        title,
        content,
        success (res) {
          if (res.confirm) {
            callback && callback()
          }
        }
      })
    },
    my () {
      mpvue.confirm({
        title,
        content,
        success: (result) => {
          if (result.confirm) {
            callback && callback()
          }
        }
      })
    }
  })
}

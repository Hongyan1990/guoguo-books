const config = require('../config')

export function showSuccess (text) {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}

export function get (url, data) {
  return request('GET', url, data)
}

export function post (url, data) {
  return request('POST', url, data)
}

function request (method, url, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      method,
      data,
      url: config.service.host + url,
      success (res) {
        if (res.data.code === 0) {
          resolve(res.data)
        } else {
          reject(res.data)
        }
      }
    })
  })
}

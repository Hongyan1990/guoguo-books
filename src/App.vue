<script>
  // import qcloud from 'wafer2-client-sdk'
  // import config from './config'
  //
  // import { showSuccess } from './utils'

  export default {
    created () {
      // const user = wx.getStorageSync('userInfo')
      // if (!user) {
      //   qcloud.setLoginUrl(config.service.loginUrl)
      //   qcloud.login({
      //     success: function (userInfo) {
      //       wx.setStorageSync('userInfo', userInfo)
      //       showSuccess('成功')
      //     },
      //     fail: function (err) {
      //       console.log('登录失败', err)
      //     }
      //   })
      // }
    }
  }
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
  button {
    width: 100%;
    color: white;
    background-color: #2db7f5;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    padding: 0 15px;
    border-radius: 2px;
  }
  button:active {
    background-color: #6ec3f5;
  }
  .more-tip {
    text-align: center;
    font-size: 12px;
  }
</style>

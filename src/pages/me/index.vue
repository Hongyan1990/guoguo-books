<template>
  <div class="container">
    <!--<p>{{userInfo.openId}}</p>-->
    <img :src="userInfo.avatarUrl" :alt="userInfo.nickName" @click="login1">
    <p>{{userInfo.nickName}}</p>
    <year-progress />
    <button v-if="userInfo.openId" @click="scanBook">添加图书</button>
    <button v-if="!userInfo.openId" open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">点击登录</button>
  </div>
</template>

<script>
  import YearProgress from '@/components/YearProgress'
  import qcloud from 'wafer2-client-sdk'
  import config from '@/config'
  import { showSuccess, post } from '@/utils'
  export default {
    name: 'index',
    components: {
      YearProgress
    },
    data () {
      return {
        userInfo: {
          avatarUrl: '../../static/images/user.png',
          nickName: ''
        }
      }
    },
    methods: {
      scanBook () {
        const self = this
        wx.scanCode({
          success (res) {
            self.addBook(res.result, self.userInfo.openId)
          }
        })
      },
      login1 () {
        let self = this
        // const user = wx.getStorageSync('userInfo')
        // if (user) {
        //   return
        // }
        qcloud.setLoginUrl(config.service.loginUrl)
        qcloud.login({
          success: function (userInfo) {
            wx.setStorageSync('userInfo', userInfo)
            self.userInfo = userInfo
            showSuccess('登录成功')
          },
          fail: function (err) {
            console.log('登录失败', err)
          }
        })
      },
      onGotUserInfo: function (e) {
        console.log(e)
      },
      addBook (isbn, openId) {
        post('/weapp/book', {isbn, openId}).then(() => {
          showSuccess('添加图书成功')
        }).catch(err => {
          console.log(err)
          wx.showModal({
            title: '添加失败',
            content: err.data.msg
          })
        })
      }
    },
    computed: {
      // userInfo () {
      //   return wx.getStorageSync('userInfo')
      // }
    },
    created () {
      const user = wx.getStorageSync('userInfo')
      if (user) {
        this.userInfo = user
      }
    }
  }
</script>

<style lang="scss">
  .container {
    text-align: center;
    padding: 0 30rpx;
    img {
      width: 150rpx;
      height: 150rpx;
      border-radius: 50%;
      margin-top: 100rpx;
    }
    p {
      margin: 30rpx 0rpx;
    }

  }
</style>

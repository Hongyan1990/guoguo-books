<template>
  <div class="comment">
    <textarea name="comment"
              class="textarea"
              v-model="comment"
              :maxlength="100"
              placeholder="请输入图书短评"
              >
    </textarea>
    <div class="location">
      地理位置：<switch color="#2db7f5" :checked="location" @change="getGeo" />
      <span>{{location}}</span>
    </div>
    <div class="phone">
      手机型号：<switch color="#2db7f5" :checked="phone" @change="getPhone"  />
      <span>{{phone}}</span>
    </div>
    <div class="save-btn">
      <button @click="addComment">添加评论</button>
    </div>
  </div>
</template>

<script>
  import {post} from '@/utils'
  export default {
    name: 'AddComment',
    data () {
      return {
        comment: '',
        location: '',
        phone: ''
      }
    },
    props: ['bookId', 'userInfo'],
    methods: {
      getGeo (e) {
        const ak = 'pCkiiazwKwF3wonX6XwKPkemf0Yb75cg'
        let url = 'http://api.map.baidu.com/reverse_geocoding/v3/'
        if (e.target.value) {
          wx.getLocation({
            success: res => {
              console.log(res)
              wx.request({
                method: 'GET',
                url,
                data: {
                  ak,
                  output: 'json',
                  coordtype: 'wgs84',
                  location: `${res.latitude},${res.longitude}`
                },
                success: geo => {
                  if (geo.data.status === 0) {
                    console.log(geo.data)
                    this.location = geo.data.result.addressComponent.city
                  } else {
                    this.location = ''
                  }
                }
              })
            }
          })
        } else {
          this.location = ''
        }
      },
      getPhone (e) {
        if (e.target.value) {
          wx.getSystemInfo({
            success: res => {
              console.log(res)
              this.phone = res.model
            }
          })
        } else {
          this.phone = ''
        }
      },
      async addComment () {
        const params = {
          comment: this.comment,
          location: this.location,
          phone: this.phone,
          bookid: this.bookId,
          openid: this.userInfo.openId
        }
        try {
          await post('/weapp/comment', params)
          this.comment = ''
          this.$emit('addCom')
        } catch (e) {
        }
      }
    },
    mounted () {
    }
  }
</script>

<style scoped lang="scss">
  .comment {
    margin-top: 10px;
    font-size: 14px;
    .textarea {
      background-color: #eee;
      width: 710rpx;
      height: 200rpx;
      padding: 20rpx;
    }
    .location {
      margin-top: 10px;
      span {
        color: #2db7f5;
        font-weight: bold;
      }
    }
    .phone {
      margin-top: 10px;
      span {
        color: #2db7f5;
        font-weight: bold;
      }
    }
    .save-btn {
      padding: 10px;
    }
  }
</style>

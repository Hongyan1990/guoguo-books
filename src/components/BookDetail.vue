<template>
  <div class="bookinfo">
    <div class="thumb">
      <image  class="back" :src="info.image" mode="scaleToFill"></image>
      <image class="img" :src="info.image" mode="aspectFit"></image>
      <div class="info">
        <div class="title">{{info.title}}</div>
        <div class="author">{{info.author}}</div>
      </div>
    </div>
    <div class="detail">
      <div class="item">
        <div class="user"><image class="user-img" :src="userInfo.image" mode="aspectFit"></image>{{userInfo.name}}</div>
        <div class="rate">{{info.rate}}分 <star :rate="info.rate" /></div>
      </div>
      <div class="item">
        <div class="publisher">{{info.publisher}}</div>
        <div class="price">{{info.price}}</div>
      </div>
    </div>
    <div class="tags">
      <div class="tag" :key="tag" v-for="tag in info.tags">{{tag}}</div>
    </div>
    <div class="summary">
      <p :key="i" v-for="(item, i) in info.summary">{{item}}</p>
    </div>
  </div>
</template>

<script>
  import Rate from 'vue-tiny-rate'
  import Star from '@/components/Star'
  export default {
    name: 'BookDetail',
    components: {
      Rate,
      Star
    },
    props: ['info'],
    computed: {
      userInfo () {
        return this.info.user_info || {}
      }
    }
  }
</script>

<style scoped lang="scss">
.bookinfo {
  font-size: 14px;
  .tags {
    padding: 5px;
    .tag {
      font-size: 14px;
      display: inline-block;
      padding: 5px 10px;
      margin: 2px;
      border: 1px solid #2db7f5;
      border-radius: 4px;
    }
  }
  .summary {
    margin-top: 10px;
    padding: 0px 10px 10px 10px;
    p {
      text-indent: 2em;
    }
  }
  .detail {
    font-size: 14px;
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
    }
    .user {
      display: flex;
      align-items: center;
      font-weight: bold;
      color: #2db7f5;
      .user-img {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-right: 5px;
      }
    }
    .rate {
      display: flex;
      font-weight: bold;
      color: #2db7f5;
    }
  }
  .thumb {
    width: 750rpx;
    height: 500rpx;
    overflow: hidden;
    position: relative;
    .back {
      filter: blur(15px);
      width: 100%;
    }
    .img {
      position: absolute;
      height: 300rpx;
      width: 100%;
      left: 0px;
      top: 40rpx;
    }
    .info {
      position: absolute;
      color: white;
      top: 340rpx;
      left: 0rpx;
      width: 100%;
      z-index: 99;
      text-align: center;
      .title {
        font-size: 20px;
      }
      .author {
        font-size: 14px;
      }
    }
  }
}
</style>

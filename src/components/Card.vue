<template>
  <div>
    <a :href="detailsUrl"  class="card">
      <div class="thumb">
        <image  @click.stop="previewImg" :src="bookInfo.image"  mode="aspectFit"></image>
      </div>
      <div class="info">
        <p><span>{{bookInfo.title}}</span><span style="display: flex; justify-content: space-between;"><rate theme="#2db7f5" :value="bookInfo.rate/2" /> {{bookInfo.rate}}</span></p>
        <p><span>{{bookInfo.author}}</span><span style="font-weight: bold;color: #2db7f5;">浏览量 {{bookInfo.count}}</span></p>
        <p><span>{{bookInfo.publisher}}</span><span>{{bookInfo.user_info.nickName}}</span></p>
      </div>
    </a>
  </div>
</template>

<script>
  import Rate from 'vue-tiny-rate'
  import Star from '@/components/Star'

  export default {
    props: ['bookInfo'],
    components: {
      Star,
      Rate
    },
    computed: {
      detailsUrl () {
        return `/pages/details/main?id=${this.bookInfo.id}`
      }
    },
    methods: {
      previewImg () {
        wx.previewImage({
          current: this.bookInfo.image,
          urls: [this.bookInfo.image]
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.card {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding: 10px 0px;
  .thumb {
    width: 90px;
    height: 90px;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .info {
    width: calc(100% - 95px);
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*.left-info {*/
      /*!*flex: 2;*!*/

    /*}*/
    /*.right-info {*/
      /*!*flex: 1;*!*/
      /*min-width: 80px;*/
      /*width: 80px;*/
      /*margin: 0 10px;*/
      /*.rate {*/
        /*display: flex;*/
        /*align-items: center;*/
        /*justify-content: space-between;*/
      /*}*/
      /*p {*/
        /*padding-bottom: 10px;*/
      /*}*/
    /*}*/
    p{
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      span:first-child {
        display: inline-block;
        width: calc(100% - 95px);
      }
    }
    p:first-child {
      color: #2db7f5;
      font-weight: bold;
    }
  }
}
</style>

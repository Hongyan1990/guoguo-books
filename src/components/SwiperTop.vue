<template>
  <div>
    <swiper :indicator-dots="true"
            :autoplay="true"
            indicator-color="#2db7f5"
            :interval="6000"
            :duration="1000"
            :circular="true">
      <div v-for="(item, index) in swiperItems" :key="index">
        <swiper-item>
          <image class="slide-image"
                 mode="aspectFit"
                 v-for="(imgInfo, subIndex) in item"
                 :src="imgInfo.image"
                 @click="gotoDetail(imgInfo)"
                 :key="subIndex">
          </image>
        </swiper-item>
      </div>
    </swiper>
  </div>
</template>

<script>
  import chunk from 'chunk'
  export default {
    name: 'SwiperTop',
    props: ['tops'],
    computed: {
      swiperItems () {
        return chunk(this.tops, 3)
      }
    },
    methods: {
      gotoDetail (imgInfo) {
        wx.navigateTo({
          url: `/pages/details/main?id=${imgInfo.id}`
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  swiper {
    margin-top: 5px;
    .slide-image {
      width: 33%;
      height: 250rpx;
    }
  }
</style>

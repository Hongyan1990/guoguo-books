<template>
  <div>
    <swiper-top :tops="tops" />
    <card v-for="(book, index) in booklist" :key="index" :bookInfo="book" />
    <div v-if="!more" class="more-tip">没有更多数据了...</div>
  </div>
</template>

<script>
  import { get } from '@/utils'
  import Card from '@/components/Card'
  import SwiperTop from '@/components/SwiperTop'
  export default {
    name: 'index',
    components: {
      Card,
      SwiperTop
    },
    data () {
      return {
        booklist: [],
        page: 0,
        more: true,
        tops: []
      }
    },
    methods: {
      async getBooklist (init) {
        if (init) {
          this.page = 0
          this.more = true
        }
        wx.showNavigationBarLoading()
        const res = await get('/weapp/booklist', {page: this.page})
        if (res.data.books.length < 10 && this.page > 0) {
          this.more = false
        }
        if (init) {
          this.booklist = res.data.books || []
          wx.stopPullDownRefresh()
        } else {
          this.booklist = this.booklist.concat(res.data.books)
        }
        wx.hideNavigationBarLoading()
      },
      async getTops () {
        const info = await get('/weapp/top')
        this.tops = info.data.list
      }
    },
    onPullDownRefresh () {
      this.getBooklist(true)
      this.getTops()
    },
    onReachBottom () {
      if (!this.more) {
        return false
      }
      this.page += 1
      this.getBooklist(false)
    },
    mounted () {
      this.getBooklist(true)
      this.getTops()
    }
  }
</script>

<style scoped>

</style>

<template>
  <div>
    <comment-list v-if="comments.length" type="user" :comments="comments"></comment-list>
    <div class="book-list">
      <div class="page-title">我的图书</div>
      <card v-for="(book, index) in booklist" :key="index" :bookInfo="book" />
      <div v-if="!booklist.length">你暂时还没有添加图书，请添加图书！</div>
    </div>
  </div>
</template>

<script>
  import {get} from '@/utils'
  import CommentList from '@/components/CommentList'
  import Card from '@/components/Card'
  export default {
    name: 'index',
    components: {
      CommentList,
      Card
    },
    data () {
      return {
        comments: [],
        userInfo: {},
        booklist: []
      }
    },
    methods: {
      init () {
        wx.showNavigationBarLoading()
        this.getCommentList()
        this.getBooks()
        wx.hideNavigationBarLoading()
      },
      async getCommentList () {
        const comments = await get('/weapp/commentlist', {
          openid: this.userInfo.openId
        })
        this.comments = comments.data.comments || []
      },
      async getBooks () {
        const books = await get('/weapp/booklist', {
          openid: this.userInfo.openId
        })
        this.booklist = books.data.books || []
      }
    },
    onPullDownRefresh () {
      this.init()
      wx.stopPullDownRefresh()
    },
    onShow () {
      if (!this.userInfo.openId) {
        const userInfo = wx.getStorageSync('userInfo')
        if (userInfo) {
          this.userInfo = userInfo
          this.init()
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .book-list {
    font-size: 12px;
    .page-title {
      background-color: #eee;
    }
  }
</style>

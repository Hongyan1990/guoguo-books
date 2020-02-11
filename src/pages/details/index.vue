<template>
  <div>
    <div v-if="bookInfo.title">
      <book-detail :info="bookInfo" />
      <comment-list v-if="comments.length" :comments="comments"></comment-list>
      <add-comment v-if="showAddComment" :bookId="bookId" :userInfo="userInfo" @addCom="getCommentList" />
      <div v-else class="footer">您暂未登录或已经评论过啦！</div>
    </div>
    <div v-else>
      数据加载中...
    </div>
    <div class="share-btn">
      <button open-type="share">点击分享</button>
    </div>

  </div>
</template>

<script>
  import {get} from '@/utils'
  import BookDetail from '@/components/BookDetail'
  import AddComment from '@/components/AddComment'
  import CommentList from '@/components/CommentList'
  export default {
    name: 'index',
    components: {
      BookDetail,
      AddComment,
      CommentList
    },
    data () {
      return {
        bookId: '',
        bookInfo: {},
        comments: [],
        userInfo: {}
      }
    },
    computed: {
      showAddComment () {
        console.log(this.userInfo.openId)
        if (!this.userInfo.openId) {
          return false
        }
        if (this.comments.filter(v => v.openid === this.userInfo.openId).length > 0) {
          return false
        }
        return true
      }
    },
    methods: {
      async getDetail () {
        const info = await get('/weapp/bookdetail', {id: this.bookId})
        this.bookInfo = info.data
      },
      async getCommentList () {
        const comments = await get('/weapp/commentlist', {bookid: this.bookId})
        this.comments = comments.data.comments || []
      }
    },
    onShareAppMessage (res) {
      console.log(res)
    },
    // onShow () {
    //   this.bookInfo = {}
    // },
    mounted () {
      this.bookInfo = {}
      const { id } = this.$root.$mp.query
      this.bookId = id
      const userInfo = wx.getStorageSync('userInfo')
      if (userInfo) {
        this.userInfo = userInfo
      }
      this.getDetail()
      this.getCommentList()
    }
  }
</script>

<style scoped>
.footer {
  text-align: center;
  font-size: 14px;
}
  .share-btn {
    padding: 10px;
  }
</style>

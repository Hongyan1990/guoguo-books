<template>
  <div class="comment-list">
    <div class="title">
      评论
    </div>
    <div class="comments"
         v-for="(comment, index) in comments"
         :key="index"
         @click="handleClick(comment)"
    >
      <div class="user-info">
        <div>
          <image :src="comment.user_info.avatarUrl" mode="aspectFit" class="avatar"></image>
          {{comment.user_info.name}}
        </div>
        <div>
          <span>{{comment.location}}</span>
          <span>--</span>
          <span>{{comment.phone}}</span>
        </div>
      </div>
      <div class="content">
        {{comment.comment}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CommentList',
    props: ['comments', 'type'],
    methods: {
      handleClick (comment) {
        if (this.type === 'user') {
          wx.navigateTo({
            url: `/pages/details/main?id=${comment.bookid}`
          })
        }
      }
    }
  }
</script>

<style scoped lang="scss">
.comment-list {
  background-color: #eee;
  font-size: 14px;
  .comments {
    background-color: white;
    margin-bottom: 10px;
    padding: 5px 10px;
    .user-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .avatar {
        width: 20px;
        height: 20px;
        border-radius: 50%;
      }
    }
  }
}
</style>

<template>
  <div class="star">
    <span>☆☆☆☆☆</span>
    <p class="star-show" :style="styled">★★★★★</p>
  </div>
</template>

<script>
  export default {
    name: 'star',
    props: ['rate'],
    computed: {
      styled () {
        return `width: ${this.rate / 2}em`
      }
    }
  }
</script>

<style scoped lang="scss">
  .star {
    position: relative;
    display: inline-block;
    .star-show {
      position: absolute;
      top: 0px;
      left: 0px;
      display: inline-block;
      width: 0;
      overflow: hidden;
    }
  }
</style>

<template>
  <div class="progress-container">
    <progress :percent="getPercent" active activeColor="#2db7f5"/>
    <p>{{getCurrentYear}}年已过去{{getCurrentDayOfYear}}天，占{{getPercent}}%</p>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    name: 'YearProgress',
    computed: {
      getCurrentDayOfYear () {
        return moment().dayOfYear()
      },
      getCurrentYear () {
        return moment().year()
      },
      getPercent () {
        const allDaysOfYear = moment().isLeapYear() ? 366 : 365
        return (moment().dayOfYear() * 100 / allDaysOfYear).toFixed(1)
      }
    }
  }
</script>

<style lang="scss">
.progress-container {
  width: 100%;
  font-size: 14px;
  margin: 20rpx 0;
}
</style>

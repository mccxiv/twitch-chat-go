<template lang="jade">
  .menu
    i.fa.fa-times.close(@click='backToChat')
</template>

<script>
  import {dispatch} from '../state/store'

  export default {
    methods: {
      backToChat: () => dispatch('view', 'Chat')
    }
  }
</script>

<style scoped lang="stylus">
  .close
    position absolute
    bottom 35px
    left 50%
    transform translateX(-50%)
</style>

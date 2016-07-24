<template lang="jade">
  .menu
    .item
      i.fa.fa-plus(@click='newChat')
      | Join Channel
    .item
      i.fa.fa-sign-out(@click='signOut')
      | Sign Out

    i.fa.fa-times.close(@click='backToChat')
</template>

<script>
  import {dispatch} from '../state/store'

  export default {
    methods: {
      backToChat: () => dispatch('view', 'Chat'),
      newChat: () => dispatch('view', 'Join'),
      signOut: () => {
        dispatch('username', '')
        dispatch('token', '')
        dispatch('view', 'Login')
      }
    }
  }
</script>

<style scoped lang="stylus">
  .menu
    display flex
    flex-direction column
    align-items center
    justify-content center
    .item
      width 120px
      margin-bottom 20px
      i
        margin-right 10px

  .close
    position absolute
    bottom 35px
    left 50%
    transform translateX(-50%)
</style>

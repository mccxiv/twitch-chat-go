<template lang="jade">
  .menu
    .item(@click='newChat')
      i.fa.fa-plus
      | Change channel
    .item(@click='signOut')
      i.fa.fa-sign-out
      | Sign out

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
    background linear-gradient(135deg, #f8fdfe 0%, #a7dcfe 100%)
    .item
      width 145px
      margin-bottom 20px
      i
        margin-right 10px

  .close
    position absolute
    bottom 35px
    left 50%
    transform translateX(-50%)
</style>

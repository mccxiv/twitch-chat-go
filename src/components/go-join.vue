<template lang="jade">
  .join
    form(@submit.prevent='go')
      input(placeholder='channel to join' @input='changeChannel')
</template>

<script>
  import {dispatch} from '../state/store'

  export default {
    methods: {
      changeChannel: e => {
        dispatch('channel', e.srcElement.value.toLowerCase())
      },
      go () {
        dispatch('joinchannel')
        dispatch('view', 'Chat')
      }
    }
  }
</script>

<style scoped lang="stylus">
  .join
    background linear-gradient(135deg, #f8fdfe 0%, #fee4a7 100%)
    input
      background none
      position absolute
      width 100%
      top 50%
      transform translateY(-50%)
      text-align center
</style>

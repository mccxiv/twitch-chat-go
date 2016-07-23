<template lang="jade">
  .chat
    .messages
      .line(v-for='msg in messages')
        span {{msg.user['display-name']}}:
        span {{msg.message}}
    chat-input.input

</template>

<script>
  import * as client from '../lib/client'
  import {state, dispatch} from '../state/store'
  import ChatInput from './chat-input.vue'

  export default {
    components: {'chat-input': ChatInput},
    ready () {
      this.client = client.get()
      this.client.on('message', (channel, user, message) => {
        dispatch('onemsg', {channel, user, message, at: Date.now()})
      })
    },
    computed: {
      messages: () => state.messages
    },
    destroyed () {
      this.client.removeAllListeners()
    }
  }
</script>

<style scoped lang="stylus">
  .chat
    display flex
    flex-direction column
    .messages
      padding 10px
      flex 1
      overflow-y auto
      .line
        span:first-child
          font-size 9px
          margin-right 3px
    .input
      padding 20px
      padding-top 10px

</style>

<template lang="jade">
  .chat
    .messages(v-el:messages)
      .line(v-for='msg in messages')
        span {{msg.user['display-name'] || msg.user.username}}:
        span {{msg.message}}
    chat-input.input
    i.fa.fa-bars.menu

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

      this.client.on('connected', async () => {
        const channel = state.channel
        const url = `https://backlog.gettc.xyz/v1/${channel}?limit=200`
        const resp = await fetch(url)
        const msgs = await resp.json()
        dispatch('manymsgs', msgs)
      })
    },
    computed: {
      messages: () => state.messages
    },
    watch: {
      messages () {
        const el = this.$els.messages
        el.scrollTop = el.scrollHeight
      }
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
    .menu
      position absolute
      top 15px
      right 20px
    .messages
      padding 10px
      font-size 12px
      flex 1
      overflow-y auto
      .line
        overflow-wrap break-word
        word-wrap break-word
        word-break break-all
        span:first-child
          font-size 9px
          margin-right 3px
    .input
      padding 20px
      padding-top 10px

</style>

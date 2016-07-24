<template lang="jade">
  .chat
    .messages(v-el:messages)
      .line(v-for='msg in messages')
        span(v-if='msg.user') {{msg.user['display-name'] || msg.user.username}}:
        span(v-bind:class='{"system-msg": !msg.user}') {{msg.message}}
    tcm-input.input
    i.fa.fa-bars.menu(v-on:click='openMenu')

</template>

<script>
  import * as client from '../lib/client'
  import {state, dispatch} from '../state/store'
  import input from './tcm-input.vue'

  export default {
    components: {'tcm-input': input},
    ready () {
      this.client = client.make()

      this.client.on('message', (channel, user, message) => {
        dispatch('onemsg', {channel, user, message, at: Date.now()})
      })

      this.client.on('connected', async () => {
        const {channel} = state
        const base = `https://backlog.gettc.xyz/v1/${channel}`
        const twoDaysAgo = Date.now() - 1.728e+8
        const params = '?limit=200&after=' + twoDaysAgo
        const resp = await fetch(base + params)
        const msgs = await resp.json()
        dispatch('manymsgs', msgs)
      })

      this.scroll()
    },
    methods: {
      openMenu: () => dispatch('view', 'Menu'),
      scroll () {
        const el = this.$els.messages
        el.scrollTop = el.scrollHeight
      }
    },
    computed: {
      messages: () => state.messages
    },
    watch: {
      messages () {this.scroll()}
    },
    destroyed () {client.kill()}
  }
</script>

<style scoped lang="stylus">
  .chat
    display flex
    flex-direction column
    .menu
      position absolute
      bottom 20px
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
        .system-msg
          color gray
    .input
      padding 20px
      padding-top 10px

</style>

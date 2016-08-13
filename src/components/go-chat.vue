<template lang="jade">
  .chat
    .messages(v-el:messages)
      .line(v-for='msg in messages')
        span(v-if='msg.user' v-bind:style='{color: msg.user.color}')
          | {{msg.user['display-name'] || msg.user.username}}:
        span(v-bind:class='{"system-msg": !msg.user}') {{msg.message}}
    go-input.input
    i.fa.fa-bars.menu(v-on:click='openMenu')

    i.fa.fa-circle-o-notch.fa-spin.loading-spinner(
      v-show='fetching'
      transition='fade'
    )

</template>

<script>
  import * as client from '../lib/client'
  import {state, dispatch} from '../state/store'
  import input from './go-input.vue'

  export default {
    components: {'go-input': input},
    data () {return {fetching: false}},
    ready () {
      this.boundScroll = this.scroll.bind(this)
      this.boundFetch = this.fetchBacklog.bind(this)
      this.fetchBacklog()
      this.client = client.make()
      this.client.on('message', (channel, user, message) => {
        dispatch('onemsg', {channel, user, message, at: Date.now()})
      })
      this.client.on('connected', this.boundFetch)
      this.client.on('disconnected', this.boundFetch)
      this.scroll()
      window.addEventListener('resize', this.boundScroll)
    },
    destroyed () {
      window.removeEventListener('resize', this.boundScroll)
      client.kill()
    },
    methods: {
      openMenu: () => dispatch('view', 'Menu'),
      scroll () {
        const el = this.$els.messages
        el.scrollTop = el.scrollHeight
      },
      async fetchBacklog () {
        const {channel} = state
        this.fetching = true
        const base = `https://backlog.gettc.xyz/v1/${channel}`
        const twoDaysAgo = Date.now() - 1.728e+8
        const params = '?limit=200&after=' + twoDaysAgo
        const resp = await fetch(base + params)
        const msgs = await resp.json()
        this.fetching = false
        dispatch('removeselfmessages')
        dispatch('manymsgs', msgs)
      }
    },
    computed: {
      messages: () => state.messages
    },
    watch: {
      messages () {this.scroll()}
    }
  }
</script>

<style scoped lang="stylus">
  .chat
    display flex
    flex-direction column
    background linear-gradient(135deg, #f8fdfe 0%, #e9e1fe 100%)
    .menu
      position absolute
      bottom 20px
      right 20px
    .messages
      padding 10px
      font-size 15px
      flex 1
      overflow-y auto
      .line
        overflow-wrap break-word
        word-wrap break-word
        word-break break-all
        span:first-child
          font-size 9px
          margin-right 3px
          display inline-block
          min-width 65px
          text-align right
        .system-msg
          color gray

    .input
      padding 20px
      padding-top 10px

    .loading-spinner
      position absolute
      color gray
      top 15px
      right 15px
      &.fade-leave
        transition opacity 1s
        opacity 0


</style>

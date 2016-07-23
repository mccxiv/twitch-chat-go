<template lang="jade">
  .chat
    .line(v-for='msg in messages')
      span {{msg.user['display-name']}}:
      span {{msg.message}}
</template>

<script>
  import * as client from '../lib/client'
  import {state, dispatch} from '../state/store'

  export default {
    ready () {
      this.client = client.instantiate()
      this.client.on('message', (channel, user, message) => {
        dispatch('onemsg', {channel, user, message, at: Date.now()})
      })
    },
    computed: {
      messages: () => state.messages
    }
  }
</script>

<style scoped lang="stylus">
  .chat
    padding 20px
</style>

<template lang="jade">
  .login
    a(href='https://api.twitch.tv/kraken/oauth2/authorize?response_type=token&client_id=b39ix7rp2i5l426ng0h2lij4cfz9htk&redirect_uri=http%3A%2F%2Flocalhost%2F&scope=chat_login')
      i.fa.fa-sign-in.sign-in(v-if='!loggingIn')
</template>

<script>
  import {state, dispatch} from '../state/store'

  export default {
    data: () => ({state, loggingIn: false}),
    async ready () {
      if (!window.location.hash) return
      const parts = window.location.hash.split('&')
      window.location.hash = ''
      const withToken = parts.find(p => p.includes('access_token='))
      if (!withToken) return
      const token = withToken.split('=')[1]
      this.loggingIn = true
      const prom = fetch(`https://api.twitch.tv/kraken?oauth_token=${token}`)
      try {
        const response = await (await prom).json()
        if (!response.token.valid) return this.abortLogin()
        dispatch('token', token)
        dispatch('username', response.token.user_name)
        this.login()
      }
      catch (e) {this.abortLogin()}
    },
    methods: {
      login: () => dispatch('view', 'Chat'),
      abortLogin () {this.loggingIn = false}
    }
  }
</script>

<style scoped lang="stylus">
  .login
    display flex
    flex-direction column
    justify-content center
    align-items center
    background linear-gradient(135deg, #f8fdfe 0%, #b6fea7 100%)
    a
      color inherit
      .sign-in
        font-size 50px

</style>

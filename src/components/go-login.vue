<template lang="jade">
  .login
    a(href='{{baseUrl + baseParams + clientId + redirectUri}}')
      i.fa.fa-sign-in.sign-in(v-if='!loggingIn')
</template>

<script>
  import {state, dispatch} from '../state/store'
  import config from '../lib/config'

  export default {
    data: () => ({
      state,
      loggingIn: false,
      baseUrl: 'https://id.twitch.tv/oauth2/authorize',
      baseParams: '?response_type=token&scope=chat_login',
      redirectUri: '&redirect_uri=' + encodeURIComponent(config.REDIRECT_URI),
      clientId: '&client_id=' + config.CLIENT_ID
    }),
    async ready () {
      if (!window.location.hash) return
      const parts = window.location.hash.split('&')
      const cleanUrl = window.location.href.split('#')[0]
      window.history.replaceState({}, 'Tc GO', cleanUrl)
      const withToken = parts.find(p => p.includes('access_token='))
      if (!withToken) return
      const token = withToken.split('=')[1]
      this.loggingIn = true
      const prom = fetch('https://id.twitch.tv/oauth2/validate', {
        headers: {
          'Authorization': `OAuth ${token}`
        }
      })
      try {
        const response = await prom
        if (!response.ok) return this.abortLogin()
        const responseData = (await response).json()
        dispatch('token', token)
        dispatch('username', responseData.login)
        if (state.channel) dispatch('view', 'Chat')
        else dispatch('view', 'Join')
      }
      catch (e) {this.loggingIn = false}
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

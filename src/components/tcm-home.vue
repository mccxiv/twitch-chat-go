<template lang="jade">
  .home
    input(
      placeholder='name'
      value='{{state.username}}'
      @input='changeUsername'
    )
    input(
      placeholder='password'
      value='{{state.password}}'
      type='password'
      @input='changePassword'
    )
    i.fa.fa-check.login(v-if='readyToSignIn' @click='login')
</template>

<script>
  import {state, dispatch} from '../state/store'

  export default {
    data: () => ({state}),
    computed: {
      readyToSignIn: () => !!state.username && !!state.password
    },
    methods: {
      changeUsername: e => dispatch('username', e.srcElement.value),
      changePassword: e => dispatch('password', e.srcElement.value),
      login: () => dispatch('view', 'Chat')
    }
  }
</script>

<style scoped lang="stylus">
  .home
    $accent = #4a87ff

    display flex
    flex-direction column
    justify-content center
    align-items center
    background linear-gradient(135deg, #f8fdfe 0%, #b6fea7 100%)

    input
      border none
      background none
      outline none
      margin-bottom 20px
      text-align center

    .login
      background white
      border-radius 100%
      padding 10px
      border 2px solid $accent
      position absolute
      left 50%
      transform translate(-50%)
      bottom 70px

</style>

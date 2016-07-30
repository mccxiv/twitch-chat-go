<template lang="jade">
  component.main(:is='currentView' transition='fade')
</template>

<script>
  import Login from './go-login.vue'
  import Chat from './go-chat.vue'
  import Menu from './go-menu.vue'
  import Join from './go-join.vue'
  import {state} from '../state/store'

  export default {
    components: {Login, Chat, Menu, Join},
    computed: {
      currentView: () => state.view
    }
  }
</script>

<style lang="stylus">

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: url(../../node_modules/roboto-fontface/fonts/roboto/Roboto-Regular.woff) format('woff');
  }

  html
    box-sizing border-box
  *, *:before, *:after
    box-sizing inherit

  .fade-transition
    transition opacity 300ms ease-out
  .fade-enter, .fade-leave
    opacity: 0

  input
    border none
    outline none

  .main
    top 0
    left 0
    width 100vw
    height 100vh
    position absolute
    font-family: 'Roboto', sans-serif;
</style>

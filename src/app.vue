<template lang="jade">
  component.main(:is='currentView' transition='fade')
</template>

<script>
  import Login from './components/tcm-login.vue'
  import Chat from './components/tcm-chat.vue'
  import Menu from './components/tcm-menu.vue'
  import Join from './components/tcm-join.vue'
  import {state} from './state/store'

  export default {
    components: {Login, Chat, Menu, Join},
    computed: {
      currentView: () => state.view
    }
  }
</script>

<style lang="stylus">
  @import url(https://fonts.googleapis.com/css?family=Roboto:400);
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

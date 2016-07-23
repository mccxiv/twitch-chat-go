<template lang="jade">
  component.main(:is='currentView' transition='fade')
</template>

<script>
  import Home from './components/tcm-home.vue'
  import Chat from './components/tcm-chat.vue'
  import Menu from './components/tcm-menu.vue'
  import {state} from './state/store'

  export default {
    components: {Home, Chat, Menu},
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

  .main
    top 0
    left 0
    width 100vw
    height 100vh
    position absolute
    font-family: 'Roboto', sans-serif;
</style>

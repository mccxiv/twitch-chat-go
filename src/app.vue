<template lang="jade">
  component.main(:is = 'currentView')
</template>

<script>
  import Home from './components/home.vue'
  import Chat from './components/chat.vue'
  import {state} from './state/store'

  export default {
    components: {Home, Chat},
    computed: {
      currentView: () => state.view
    }
  }
</script>

<style lang="stylus">
  @import url(https://fonts.googleapis.com/css?family=Roboto:300);
  html
    box-sizing: border-box
  *, *:before, *:after
    box-sizing: inherit

  .main
    top 0
    left 0
    width 100vw
    height 100vh
    position absolute
    font-family: 'Roboto', sans-serif;
</style>

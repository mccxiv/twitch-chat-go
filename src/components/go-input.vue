<template lang="jade">
  form(v-on:submit.prevent='say')
    input(placeholder='say...' v-model='input')
</template>

<script>
  import * as client from '../lib/client'
  import {state} from '../state/store'

  export default {
    data () {return {input: ''}},
    ready () {
    },
    methods: {
      say () {
        client.get().say(state.channel, this.input)
        this.input = ''
      }
    }
  }
</script>

<style lang="stylus">
  form
    display flex
    input
      background none
      flex 1
      padding 20px 20px
      padding-right 50px
</style>

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

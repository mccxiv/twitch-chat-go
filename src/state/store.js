import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const initialState = {
  username: '',
  password: '',
  view: 'Home',
  channel: 'k3nt0456',
  messages: []
}

let savedState = window.localStorage.getItem('tcg-state')
if (savedState) savedState = JSON.parse(savedState)

const mutations = {
  username (state, u) {state.username = u},
  password (state, pw) {state.password = pw},
  view (state, v) {state.view = v},
  onemsg (state, msg) {
    state.messages.push(msg)
    if (state.messages.length > 50) state.messages.shift()
  },
  manymsg (state, msgs) {
    state.messages.push(...msgs)
    state.messages.sort((a, b) => a.at - b.at)
    while (state.messages.length > 50) state.messages.shift()
  }
}

console.log(savedState)

const store = new Vuex.Store({state: savedState || initialState, mutations})

store.subscribe((mutation, state) => {
  console.log('saving')
  window.localStorage.setItem('tcg-state', JSON.stringify(state))
})

export default store
export const state = store.state
export const dispatch = store.dispatch

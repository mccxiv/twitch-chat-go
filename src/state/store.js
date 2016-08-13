import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const initialState = {
  username: '',
  token: '',
  view: 'Login',
  channel: '',
  messages: []
}

let savedState = window.localStorage.getItem('tcg-state')
if (savedState) savedState = JSON.parse(savedState)

const mutations = {
  username (state, u) {state.username = u},
  token (state, pw) {state.token = pw},
  channel (state, c) {state.channel = c},
  view (state, v) {state.view = v},
  joinchannel (state) {
    while (state.messages[0] && state.messages[0].channel !== state.channel) {
      state.messages.shift()
    }
  },
  onemsg (state, msg) {
    state.messages.push(msg)
    if (state.messages.length > 200) state.messages.shift()
  },
  removeselfmessages (state) {
    for (let i = state.messages.length - 1; i > -1; i--) {
      const msg = state.messages[i]
      if (msg.user && !msg.user.id) state.messages.splice(i, 1)
    }
  },
  manymsgs (state, msgs) {
    msgs.forEach(msg => {
      if (state.messages.find(m => {
        if (!m.user || !msg.user) return false
        return m.user.id === msg.user.id
      })) return
      state.messages.push(msg)
    })
    state.messages.sort((a, b) => a.at - b.at)
    while (state.messages.length > 200) state.messages.shift()
  }
}

const store = new Vuex.Store({state: savedState || initialState, mutations})

store.subscribe((mutation, state) => {
  window.localStorage.setItem('tcg-state', JSON.stringify(state))
})

export default store
export const state = store.state
export const dispatch = store.dispatch

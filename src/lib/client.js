import twitchjs from 'twitch-js'
import store from '../state/store'

let client

export function get () {
  return client
}

export function make () {
  if (client) return client

  const {username, token: password, channel} = store.state

  client = new twitchjs.Client({
    connection: {secure: true, reconnect: true},
    identity: {username, password},
    channels: [channel]
  })
  client.connect()
  return client
}

export function kill () {
  client.disconnect()
  client = null
}

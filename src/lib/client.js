import tmi from 'tmi.js'
import store from '../state/store'

let client

export function instantiate () {
  const Client = tmi.client
  const {username, password, channel} = store.state

  client = new Client({
    connection: {reconnect: true},
    // identity: {username, password}, // Anon for debugging.
    channels: [channel]
  })
  client.connect()
  return client
}

export function get () {
  return client
}
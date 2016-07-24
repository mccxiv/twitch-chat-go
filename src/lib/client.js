import tmi from 'tmi.js'
import store from '../state/store'

let client

export function make () {
  if (client) return client

  const Client = tmi.client
  const {username, password, channel} = store.state

  client = new Client({
    connection: {reconnect: true},
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

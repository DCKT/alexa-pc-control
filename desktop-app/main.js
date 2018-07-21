const { app } = require('electron')
const commands = require('./commands')
const wsEndpoint = process.env.NODE_ENV === 'production' ? '' : 'ws://localhost:8080'

app.on('ready', () => {
  const WebSocket = require('ws')

  const ws = new WebSocket(wsEndpoint)

  ws.on('message', data => {
    try {
      const { command, params } = JSON.parse(data)

      commands[command](app, params)
    } catch (e) {
      console.error('Socket parsing error')
    }
  })
})

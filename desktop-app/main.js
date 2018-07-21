const { app } = require('electron')
const commands = require('./commands')

app.on('ready', () => {
  const WebSocket = require('ws')

  const ws = new WebSocket('ws://localhost:8080')

  ws.on('message', data => {
    try {
      const { command, params } = JSON.parse(data)
      console.log(`run ${command}`)
      // commands[command](app, params)
    } catch (e) {
      console.error('Socket parsing error')
    }
  })
})

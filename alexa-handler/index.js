const Alexa = require('ask-sdk')
const express = require('express')
const bodyParser = require('body-parser')
const { LaunchRequestHandler } = require('./handlers/LaunchRequestHandler')
const { SessionEndedRequestHandler } = require('./handlers/SessionEndedRequestHandler')
const { CancelAndStopIntentHandler } = require('./handlers/CancelAndStopIntentHandler')
const { HelpIntentHandler } = require('./handlers/HelpIntentHandler')
const { ErrorHandler } = require('./handlers/ErrorHandler')
const WebSocket = require('ws')
const locales = require('./locales')

const app = express()
const ws = new WebSocket('ws://localhost:8080')
let skill

const ShutdownIntentHandler = {
  canHandle (handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'ShutdownIntent'
    )
  },
  handle (handlerInput) {
    ws.send(
      JSON.stringify({
        command: 'shutdown'
      })
    )

    return handlerInput.responseBuilder.speak(locales.fr.shutdownSuccess).getResponse()
  }
}

app.use(bodyParser.json())
app.post('/', function (req, res) {
  if (!skill) {
    skill = Alexa.SkillBuilders.custom()
      .addRequestHandlers(
        LaunchRequestHandler,
        ShutdownIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        ErrorHandler
      )
      .create()
  }

  skill
    .invoke(req.body)
    .then(function (responseBody) {
      res.json(responseBody)
    })
    .catch(function (error) {
      console.log(error)
      res.status(500).send('Error during the request')
    })
})

app.listen(process.env.ALEXA_HANDLER_PORT || 3000, function () {
  console.log('Development endpoint listening on port 3000!')
})

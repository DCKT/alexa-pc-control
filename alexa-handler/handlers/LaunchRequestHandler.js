const locales = require('../locales')

const LaunchRequestHandler = {
  canHandle (handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
  },
  handle (handlerInput) {
    return handlerInput.responseBuilder.speak(locales.fr.launchIntent).getResponse()
  }
}

module.exports = { LaunchRequestHandler }

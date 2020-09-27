const Express = require('express')
const app = Express()
const dialogflow = require('@google-cloud/dialogflow')
const uuid = require('uuid')
const cors = require('cors')

app
  .use(cors())
  .get('/query', async (req, res) => {
    console.log(req.query)
    if (!req.query.query) return res.status(400).send('missing query parameter')
    const result = await runSample(req.query.query)
    console.log(result)
    res.status(200).send(result)
  })
  .listen(8001, () => {
    console.log('listening on 8001')
  })

async function runSample (queryString) {
  // A unique identifier for the given session
  const sessionId = uuid.v4()

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient()
  const sessionPath = sessionClient.projectAgentSessionPath('symptobot-loxj', sessionId)

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: queryString,
        // The language used by the client (en-US)
        languageCode: 'en-US'
      }
    }
  }

  // Send request and log result
  const responses = await sessionClient.detectIntent(request)
  //   console.log('Detected intent')
  const result = responses[0].queryResult
  //   console.log(`  Query: ${result.queryText}`)
  //   console.log(`  Response: ${result.fulfillmentText}`)
  //   if (result.intent) {
  //     console.log(`  Intent: ${result.intent.displayName}`)
  //   } else {
  //     console.log(`  No intent matched.`)
  //   }

  return result
}

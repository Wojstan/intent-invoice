import IntentService from './IntentService'

async function simulate() {
  const intentService = new IntentService()

  const intentRequestData = {
    fromToken: 'ETH',
    toToken: 'USDC',
    amount: '0.1',
  }
  console.log(
    `🛠️ Creating intent with data: ${JSON.stringify(intentRequestData)}`,
  )
  const intent = await intentService.createIntent(intentRequestData)

  const intentId = intent.id
  let lastKnownState = JSON.stringify(intent)

  console.log(`✅ Intent created: ${JSON.stringify(intent, null, 2)}`)

  const pollInterval = setInterval(() => {
    const currentIntent = intentService.getIntent(intentId)

    if (!currentIntent) return

    const currentState = JSON.stringify(currentIntent)

    if (currentState !== lastKnownState) {
      console.log('\n🔍 [Status Update] Intent state changed:')
      console.log(JSON.stringify(currentIntent, null, 2))
      lastKnownState = currentState
    } else {
      console.log('⏳ No change detected...')
    }

    if (currentIntent.status === 'completed') {
      console.log('\n🎉 Intent completed! Stopping monitoring.')
      clearInterval(pollInterval)
    }
  }, 1000)

  // mocking approve_tokens completion here
  setTimeout(() => {
    intentService.updateStep(intentId, 'approve_tokens', 'completed')
  }, 2000)

  // mocking execute_swap completion here
  setTimeout(() => {
    intentService.updateStep(intentId, 'execute_swap', 'completed')
  }, 6000)
}

simulate()

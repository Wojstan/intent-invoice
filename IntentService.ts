import { v4 as uuidv4 } from 'uuid'

type Status = 'pending' | 'processing' | 'completed'

interface InvoiceStep {
  id: string
  description: string
  actionRequired: boolean
  status: Status
  data?: Record<string, unknown>
}

interface IntentInvoice {
  id: string
  status: Status
  steps: InvoiceStep[]
}

export default class IntentService {
  private intents: Record<string, IntentInvoice> = {}

  async createIntent(data: Record<string, unknown>): Promise<IntentInvoice> {
    const id = uuidv4()

    const steps = await mockStepList(data)
    const invoice: IntentInvoice = {
      id,
      status: 'pending',
      steps,
    }

    this.intents[id] = invoice
    return invoice
  }

  getIntent(intentId: string): IntentInvoice | null {
    return this.intents[intentId] || null
  }

  updateStep(intentId: string, stepId: string, status: Status): boolean {
    const intent = this.intents[intentId]
    if (!intent) return false

    const step = intent.steps.find((step) => step.id === stepId)
    if (!step) return false

    step.status = status
    intent.status = intent.steps.every((step) => step.status === 'completed')
      ? 'completed'
      : 'processing'

    return true
  }
}

// mocking the list of steps here (with Promise to simulate some other logic run on backend)
async function mockStepList(
  data: Record<string, unknown>,
): Promise<InvoiceStep[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 'approve_tokens',
          description: 'Approve contract to spend tokens',
          actionRequired: true,
          status: 'pending',
          data: { contract: '0xUniswapRouter' },
        },
        {
          id: 'execute_swap',
          description: `Swap ${data.amount} ${data.fromToken} to ${data.toToken}`,
          actionRequired: false,
          status: 'pending',
          data: { dex: 'Uniswap' },
        },
      ])
    }, 2000)
  })
}

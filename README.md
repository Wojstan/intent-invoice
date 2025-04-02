# Intent Invoice

To install dependencies:

```bash
bun install
```

To run:

```bash
bun dev
```

Example output (simulating intent monitoring):
```
🛠️ Creating intent with data: {"fromToken":"ETH","toToken":"USDC","amount":"0.1"}
✅ Intent created: {
  "id": "25c79cab-6c7e-4061-a13a-365bb3f2b68e",
  "status": "pending",
  "steps": [
    {
      "id": "approve_tokens",
      "description": "Approve contract to spend tokens",
      "actionRequired": true,
      "status": "pending",
      "data": {
        "contract": "0xUniswapRouter"
      }
    },
    {
      "id": "execute_swap",
      "description": "Swap 0.1 ETH to USDC",
      "actionRequired": false,
      "status": "pending",
      "data": {
        "dex": "Uniswap"
      }
    }
  ]
}
⏳ No change detected...

🔍 [Status Update] Intent state changed:
{
  "id": "25c79cab-6c7e-4061-a13a-365bb3f2b68e",
  "status": "processing",
  "steps": [
    {
      "id": "approve_tokens",
      "description": "Approve contract to spend tokens",
      "actionRequired": true,
      "status": "completed",
      "data": {
        "contract": "0xUniswapRouter"
      }
    },
    {
      "id": "execute_swap",
      "description": "Swap 0.1 ETH to USDC",
      "actionRequired": false,
      "status": "pending",
      "data": {
        "dex": "Uniswap"
      }
    }
  ]
}
⏳ No change detected...
⏳ No change detected...
⏳ No change detected...

🔍 [Status Update] Intent state changed:
{
  "id": "25c79cab-6c7e-4061-a13a-365bb3f2b68e",
  "status": "completed",
  "steps": [
    {
      "id": "approve_tokens",
      "description": "Approve contract to spend tokens",
      "actionRequired": true,
      "status": "completed",
      "data": {
        "contract": "0xUniswapRouter"
      }
    },
    {
      "id": "execute_swap",
      "description": "Swap 0.1 ETH to USDC",
      "actionRequired": false,
      "status": "completed",
      "data": {
        "dex": "Uniswap"
      }
    }
  ]
}

🎉 Intent completed! Stopping monitoring.
```
import * as React from 'react'
import { useSignMessage } from 'wagmi'
import { recoverMessageAddress } from 'viem'

export function SignMessage() {
  const [recoveredAddress, setRecoveredAddress] = React.useState<string | null>(null)
  const { data: signMessageData, error, isLoading, signMessage, variables } = useSignMessage()

  React.useEffect(() => {
    ;(async () => {
      if (variables?.message && signMessageData) {
        try {
          const recovered = await recoverMessageAddress({
            message: `0x${variables.message}`, // Ensure the message is a Hex string.
            signature: `0x${signMessageData}`,   // Ensure the signature is a Hex string.
          })
          if (recovered) {
            setRecoveredAddress(recovered)
          }
        } catch (error) {
          console.error('Error recovering address:', error)
        }
      }
    })()
  }, [signMessageData, variables?.message])

  return (
    <form
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const message = formData.get('message')
        if (message) {
          signMessage({ message: message as string })
        }
      }}
    >
      <label htmlFor="message">Enter a message to sign</label>
      <textarea
        id="message"
        name="message"
        placeholder="The quick brown fox…"
      />
      <button disabled={isLoading}>
        {isLoading ? 'Check Wallet' : 'Sign Message'}
      </button>

      {signMessageData && (
        <div>
          <div>Recovered Address: {recoveredAddress}</div>
          <div>Signature: {signMessageData}</div>
        </div>
      )}

      {error && <div>{error.message}</div>}
    </form>
  )
}

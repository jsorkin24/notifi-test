import { useAccount, useConnect, useDisconnect } from 'wagmi'

import { SignMessage } from './SignMessage'

export function Profile() {
  const { isConnected } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <div>
        {/* Account content goes here */}
        <SignMessage />
      </div>
    )
  }

  return <div>{/* Connect wallet content goes here */}</div>
}

import { arrayify, hexlify } from "@ethersproject/bytes"
import {
  NotifiContext,
  NotifiInputFieldsText,
  NotifiInputSeparators,
  NotifiSubscriptionCard,
} from "@notifi-network/notifi-react-card"
import "@notifi-network/notifi-react-card/dist/index.css"
import { useEthers } from "@usedapp/core"
import { providers } from "ethers"
import React, { useMemo } from "react"
import { useSignMessage } from "wagmi" // Import the useSignMessage hook from 'wagmi'

const Notifi: React.FC = () => {
  const { account, library } = useEthers()
  const { signMessage } = useSignMessage() // Use the signMessage function from 'wagmi'

  const inputLabels: NotifiInputFieldsText = {
    label: {
      email: "Email",
      sms: "Text Message",
      telegram: "Telegram",
    },
    placeholderText: {
      email: "Email",
    },
  }

  const inputSeparators: NotifiInputSeparators = {
    smsSeparator: {
      content: "OR",
    },
    emailSeparator: {
      content: "OR",
    },
  }

  if (account === undefined) {
    // Ensure account is defined
    return null
  }

  return (
    <NotifiContext
      dappAddress="localhost:3000"
      env="Production"
      signMessage={async (message: Uint8Array) => {
        // Use the signMessage function from 'wagmi' here
        const result = await signMessage({ message: message })

        // Ensure result is a valid hexadecimal string
        if (typeof result === "string" && /^0x[0-9A-Fa-f]*$/.test(result)) {
          return arrayify(result)
        } else {
          // Handle the case where result is not a valid hexadecimal string
          throw new Error("Invalid signature format")
        }
      }}
      walletPublicKey={account}
      walletBlockchain="ETHEREUM"
    >
      <NotifiSubscriptionCard
        cardId="c2c4db1cad60429ea86affe965abe745"
        inputLabels={inputLabels}
        inputSeparators={inputSeparators}
        darkMode // Optional
      />
    </NotifiContext>
  )
}

export default Notifi

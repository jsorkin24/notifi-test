import { arrayify } from "@ethersproject/bytes";
import {
  NotifiContext,
  NotifiInputFieldsText,
  NotifiInputSeparators,
  NotifiSubscriptionCard,
} from "@notifi-network/notifi-react-card";
import "@notifi-network/notifi-react-card/dist/index.css";
import { useEthers } from "@usedapp/core";
import React from "react";
import { useAccount, useSignMessage } from "wagmi"; // Import the useAccount hook from 'wagmi'

const Notifi: React.FC = () => {
  const { address } = useAccount(); // Use the wallet address from useAccount hook
  const { signMessage } = useSignMessage();

  const inputLabels: NotifiInputFieldsText = {
    label: {
      email: "Email",
      sms: "Text Message",
      telegram: "Telegram",
    },
    placeholderText: {
      email: "Email",
    },
  };

  const inputSeparators: NotifiInputSeparators = {
    smsSeparator: {
      content: "OR",
    },
    emailSeparator: {
      content: "OR",
    },
  };

  if (address === undefined) {
    // Ensure address is defined
    return null;
  }

  return (
    <NotifiContext
      dappAddress="localhost:3000"
      env="Production"
      signMessage={async (message: Uint8Array) => {
        const result = await signMessage({ message });

        if (typeof result === 'string' && /^0x[0-9A-Fa-f]*$/.test(result)) {
          return arrayify(result);
        } else {
          throw new Error('Invalid signature format');
        }
      }}
      walletPublicKey={address} // Set walletPublicKey to the wallet address
      walletBlockchain="ETHEREUM"
    >
      <NotifiSubscriptionCard
        cardId="c2c4db1cad60429ea86affe965abe745"
        inputLabels={inputLabels}
        inputSeparators={inputSeparators}
        darkMode // Optional
      />
    </NotifiContext>
  );
};

export default Notifi;

import { ConnectKitButton } from 'connectkit';
import  Notifi from './NotifiCard';
import { Profile } from './Profile';
import { useAccount } from 'wagmi'


function App() {
  // const { address, isConnecting, isDisconnected } = useAccount();
  // if (isConnecting) return <div>Connecting…</div>;
  // if (isDisconnected) return <div>Disconnected</div>;

  return (
    <div>
      {/* <div>{address}</div> */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Notifi />
        {/* <ConnectKitButton /> */}
        {/* <Profile/> */}
      </div>
    </div>
  );
}

export default App;

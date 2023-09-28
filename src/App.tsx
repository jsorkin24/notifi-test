import { ConnectKitButton } from 'connectkit';
import  Notifi from './NotifiCard';
import { Profile } from './Profile';



function App() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      {/* <ConnectKitButton /> */}
      <Notifi/>
      <Profile/>
    </div>
  );
}

export default App;

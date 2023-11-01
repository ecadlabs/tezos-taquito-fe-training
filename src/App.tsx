import { useState } from 'react';
import { TezosToolkit } from '@taquito/taquito';
import { Route, Routes } from 'react-router';
import { connectionStatus } from './helper';
import { env } from './config';

import ConnectButton from './components/ConnectWallet';
import DisconnectButton from './components/DisconnectWallet';
import UpdateContract from './components/UpdateContract' ;
import Transfers from './components/Transfers';
import Origination from './components/Originate';
import Navbar from './components/Navigation/Navbar';

import './App.css';

const App = () => {
  const [Tezos, setTezos] = useState<TezosToolkit>(
    new TezosToolkit(env.rpc)
  );
  const [contract, setContract] = useState<any>(undefined);
  const [publicToken, setPublicToken] = useState<string | null>(null);
  const [wallet, setWallet] = useState<any>(null);
  const [userAddress, setUserAddress] = useState<string>("");
  const [userBalance, setUserBalance] = useState<number>(0);
  const [storage, setStorage] = useState<number>(0);
  const [beaconConnection, setBeaconConnection] = useState<boolean>(false);

  // Ghostnet Increment/Decrement contract
  const contractAddress: string = env.contractAddress;
  const isConnected = connectionStatus(userAddress, userBalance);

  if (isConnected) {
    return (
      <>
        <Navbar balance={userBalance}/>
        <Routes>
          <Route path="/transfer" element={
            <Transfers
              Tezos={Tezos}
              setUserBalance={setUserBalance}
              userAddress={userAddress}
            />
          } />
          <Route path="/originate" element={
            <Origination 
              Tezos={Tezos}
            />
          }/>
          <Route path="/counter" element={
            <UpdateContract
              contract={contract}
              setUserBalance={setUserBalance}
              Tezos={Tezos}
              userAddress={userAddress}
              setStorage={setStorage}
              storage={storage}
            />
          } />
        </Routes>
        <div className="disconnect-button">
          <DisconnectButton
            wallet={wallet}
            setPublicToken={setPublicToken}
            setUserAddress={setUserAddress}
            setUserBalance={setUserBalance}
            setWallet={setWallet}
            setTezos={setTezos}
            setBeaconConnection={setBeaconConnection}
          />
        </div>
        <div id="footer">
        </div>


      </>
    )
  } else if (!isConnected) {
    return (
      <div className="main-box">
        <div className="title">
          <h1>Taquito React dApp</h1>
        </div>
        <div id="dialog">
          <header>Welcome to the Taquito workshop!</header>
          <div id="content">
            <p>Hello!</p>
            <p>
              This is a template Tezos dApp built using Taquito. It's a starting
              point for you to hack on and build your own dApp for Tezos.
              <br />
              </p>
            <p>Go forth and Tezos!</p>
          </div>
          <ConnectButton
            Tezos={Tezos}
            setContract={setContract}
            setPublicToken={setPublicToken}
            setWallet={setWallet}
            setUserAddress={setUserAddress}
            setUserBalance={setUserBalance}
            setStorage={setStorage}
            contractAddress={contractAddress}
            setBeaconConnection={setBeaconConnection}
            wallet={wallet}
          />
        </div>
        <div id="footer">
        </div>
      </div>
    )
  }
};

export default App;

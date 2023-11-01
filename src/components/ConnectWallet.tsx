import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';
import {
  NetworkType,
} from '@airgap/beacon-dapp';

type ButtonProps = {
  Tezos: TezosToolkit;
  setContract: Dispatch<SetStateAction<any>>;
  setWallet: Dispatch<SetStateAction<any>>;
  setUserAddress: Dispatch<SetStateAction<string>>;
  setUserBalance: Dispatch<SetStateAction<number>>;
  setStorage: Dispatch<SetStateAction<number>>;
  contractAddress: string;
  setBeaconConnection: Dispatch<SetStateAction<boolean>>;
  setPublicToken: Dispatch<SetStateAction<string | null>>;
  wallet: BeaconWallet;
};

const ConnectButton = ({
  Tezos,
  setContract,
  setWallet,
  setUserAddress,
  setUserBalance,
  setStorage,
  contractAddress,
  setBeaconConnection,
  setPublicToken,
  wallet,
}: ButtonProps): JSX.Element => {
  const setup = async (userAddress: string): Promise<void> => {
    setUserAddress(userAddress);

    // Check and update wallet balance when user connects wallet
    const balance = await Tezos.tz.getBalance(userAddress);
    setUserBalance(balance.toNumber());
    
    // Create contract instance
    // Question: Why do we need to create a contract instance here?
    const contract = await Tezos.wallet.at(contractAddress);
    const storage: any = await contract.storage();
    setContract(contract);
    setStorage(storage.toNumber());
  };

  const connectWallet = async (): Promise<void> => {
    try {
      await wallet.requestPermissions();
      
      // Grab user address from the wallet to pass to setup function
      const userAddress = await wallet.getPKH();
      await setup(userAddress);
      setBeaconConnection(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      // Create wallet instance and set Tezos wallet provider
      const wallet = new BeaconWallet({
        name: "Taquito React Workshop",
        preferredNetwork: NetworkType.GHOSTNET,
        network: {
          type: NetworkType.GHOSTNET,
         },
        disableDefaultEvents: false, // Disable all events when true/ UI. This also disables the pairing alert.
      });
      Tezos.setWalletProvider(wallet);
      setWallet(wallet);
      // checks if wallet was connected before
      const activeAccount = await wallet.client.getActiveAccount();
      if (activeAccount) {
        const userAddress = await wallet.getPKH();
        await setup(userAddress);
        setBeaconConnection(true);
      }
    })();
  }, []);

  return (
    <div className="buttons">
      <button className="button" onClick={connectWallet}>
        <span>
          <i className="fas fa-wallet"></i>&nbsp; Connect wallet
        </span>
      </button>
    </div>
  );
};

export default ConnectButton;

import { useState, Dispatch, SetStateAction } from 'react';
import { TezosToolkit, WalletContract } from '@taquito/taquito';
import OperationHash from '../Info/OperationHash';

interface UpdateContractProps {
  contract: WalletContract | any;
  setUserBalance: Dispatch<SetStateAction<any>>;
  Tezos: TezosToolkit;
  userAddress: string;
  setStorage: Dispatch<SetStateAction<number>>;
  storage: number;
}

const UpdateContract = ({ contract, setUserBalance, Tezos, userAddress, setStorage, storage }: UpdateContractProps) => {
  const [loadingIncrement, setLoadingIncrement] = useState<boolean>(false);
  const [loadingDecrement, setLoadingDecrement] = useState<boolean>(false);
  const [opHash, setOpHash] = useState<string>("");

  const increment = async (): Promise<void> => {
    setLoadingIncrement(true);
    try {
      const op = await contract.methods.increment(1).send();
      await op.confirmation();
      setOpHash(op.opHash);
      const newStorage: any = await contract.storage();
      if (newStorage) setStorage(newStorage.toNumber());
      setUserBalance(await Tezos.tz.getBalance(userAddress));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingIncrement(false);
    }
  };

  const decrement = async (): Promise<void> => {
    setLoadingDecrement(true);
    try {
      const op = await contract.methods.decrement(1).send();
      await op.confirmation();
      setOpHash(op.opHash);
      const newStorage: any = await contract.storage();
      if (newStorage) setStorage(newStorage.toNumber());
      setUserBalance(await Tezos.tz.getBalance(userAddress));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingDecrement(false);
    }
  };

  if (!contract && !userAddress) return <div>&nbsp;</div>;
  return (

    <div className="main-box">
      <div id="dialog">
        <div id="content">
          <h3>Increment/Decrement Storage</h3>
          <p> Current Storage: {storage}</p>
          <div className="buttons">
            <button className="button" disabled={loadingIncrement} onClick={increment}>
              {loadingIncrement ? (
                <span>
                  <i className="fas fa-spinner fa-spin"></i>&nbsp; Please wait
                </span>
              ) : (
                <span>
                  <i className="fas fa-plus"></i>&nbsp; Increment by 1
                </span>
              )}
            </button>
            <button className="button" onClick={decrement}>
              {loadingDecrement ? (
                <span>
                  <i className="fas fa-spinner fa-spin"></i>&nbsp; Please wait
                </span>
              ) : (
                <span>
                  <i className="fas fa-minus"></i>&nbsp; Decrement by 1
                </span>
              )}
            </button>
          </div>
        </div>
        <div className="op-hash">
          {!!{ opHash } &&
            <OperationHash opHash={opHash} />
          }
        </div>
      </div>
    </div>

  );
};

export default UpdateContract;

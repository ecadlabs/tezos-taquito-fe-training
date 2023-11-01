import { useState, Dispatch, SetStateAction } from 'react';
import { TezosToolkit } from '@taquito/taquito';
import OperationHash from '../Info/OperationHash';

const Transfers = ({
  Tezos,
  setUserBalance,
  userAddress
}: {
  Tezos: TezosToolkit;
  setUserBalance: Dispatch<SetStateAction<number>>;
  userAddress: string;
}): JSX.Element => {
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [opHash, setOpHash] = useState<string>("");

  const sendTransfer = async (): Promise<void> => {
    if (recipient && amount) {
      setLoading(true);
      try {

        /**
         * Hint:
         * - Implement transfer operation using the Wallet API
         * - Grab operation hash and set it to state 
         * - Clear recipient and amount inputs
         * - Check the current balance in your wallet
         * - Update the user balance in the state
         */
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="main-box">
      <div id="dialog">
        <div id="content">
          <h3 className="text-align-center"> Make a transfer</h3>
          <div id="transfer-inputs">
            <input
              type="text"
              placeholder="Recipient"
              value={recipient}
              onChange={e => setRecipient(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
            <button
              className="button"
              disabled={!recipient && !amount}
              onClick={sendTransfer}
            >
              {loading ? (
                <span>
                  <i className="fas fa-spinner fa-spin"></i>&nbsp; Please wait
                </span>
              ) : (
                <span>
                  <i className="far fa-paper-plane"></i>&nbsp; Send
                </span>
              )}
            </button>
          </div>
          <div className="op-hash">
              {!!{ opHash } &&
                <OperationHash opHash={opHash} />
              }
            </div>
        </div>
      </div>

    </div>
  );
};

export default Transfers;

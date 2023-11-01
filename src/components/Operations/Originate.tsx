import { useState } from 'react';
import { TezosToolkit } from '@taquito/taquito';
import OperationHash from '../Info/OperationHash';

const code = `parameter (or (or (int %decrement) (int %increment)) (unit %reset));
storage int;
code { UNPAIR ; IF_LEFT { IF_LEFT { SWAP ; SUB } { ADD } } { DROP 2 ; PUSH int 0 } ; NIL operation ; PAIR }`;

const Origination = ({
  Tezos,
}: {
  Tezos: TezosToolkit;
}): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [opHash, setOpHash] = useState<string>("");

  const originateContract = async () => {
    try {
      const op = await Tezos.wallet
        .originate({
          code,
          storage: 10
        })
        .send();
      setOpHash(op.opHash);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-box">
      <div id="dialog">
        <div id="content">
          <h3 className="text-align-center"> Originate a Contract</h3>
          <div id="originate-inputs">
            <div className="code-container">
              <p className="code-block">
                {code}
              </p>
            </div>
            <button
              className="button"
              onClick={originateContract}
            >
              {loading ? (
                <span>
                  <i className="fas fa-spinner fa-spin"></i>&nbsp; Please wait
                </span>
              ) : (
                <span>
                  <i className="fas"></i>&nbsp; Originate Contract
                </span>
              )}
            </button>
            <div className="op-hash">
              {!!{ opHash } &&
                <OperationHash opHash={opHash} />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Origination;


import React, { useState, Dispatch, SetStateAction } from "react";
import { TezosToolkit } from "@taquito/taquito";
import { CodeBlock, github } from 'react-code-blocks';

const code = ` parameter (or (or (int %decrement) (int %increment)) (unit %reset)) ;
storage int ;
code { UNPAIR ;
       IF_LEFT { IF_LEFT { SWAP ; SUB } { ADD } } { DROP 2 ; PUSH int 0 } ;
       NIL operation ;
       PAIR } }`;

const Origination = ({
 Tezos,
}: {
  Tezos: TezosToolkit;
}): JSX.Element => {
  // const [contractAddress, setContractAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const originateContract = async () => {
    const code = `parameter nat; storage nat; code { CAR ; NIL operation ; PAIR }`;
    try {
      const op = await Tezos.wallet
        .originate({
          code,
          storage: 10
        })
        .send();


    } catch(error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

  };

  return (
    <div id="originate-inputs">
     <CodeBlock 
      text={code}
      language= {'json'}
      showLineNumbers={true}
      theme={github}
     />
     
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
            <i className="fas fa-plus"></i>&nbsp; Originate Contract
          </span>
        )}
      </button>
    </div>
  );
  
  }

export default Origination;


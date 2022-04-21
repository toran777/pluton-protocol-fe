import { Fee, MsgExecuteContract, MsgSend } from '@terra-money/terra.js';
import {CreateTxFailed, Timeout, TxFailed, TxUnspecifiedError, useConnectedWallet, UserDenied} from '@terra-money/wallet-provider';
import React, { useCallback, useState } from 'react';

export function useRegister() {
  const connectedWallet = useConnectedWallet();
  const contractAddress = "terra1s6v2km9zd33wemr492la8tvjkll2dhnmguz64x"

  const register = (item) => {
    
    if (connectedWallet) {

        connectedWallet
        .post({
            msgs: [
            new MsgExecuteContract(
                connectedWallet.walletAddress,
                contractAddress,
                {
                "register": {
                    "img": item.img,
                    "name": item.name,
                    "description": item.description,
                    "github": item.github,
                    "linkedin": item.linkedin,
                    "twitter": item.twitter
                }
                },
                {uusd : msg.amount * 1000000}
            )
            ]
        })
        .catch((error) => {
            if (error instanceof UserDenied) {
            setTxError('User Denied');
            } else if (error instanceof CreateTxFailed) {
            setTxError('Create Tx Failed: ' + error.message);
            } else if (error instanceof TxFailed) {
            setTxError('Tx Failed: ' + error.message);
            } else if (error instanceof Timeout) {
            setTxError('Timeout');
            } else if (error instanceof TxUnspecifiedError) {
            setTxError('Unspecified Error: ' + error.message);
            } else {
            setTxError('Unknown Error: ' + (error instanceof Error ? error.message : String(error)),
            );
        }
        });
    }
}
  return { register }
}

export default useRegister
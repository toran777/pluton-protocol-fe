import {MsgExecuteContract} from '@terra-money/terra.js';
import {
    CreateTxFailed,
    Timeout,
    TxFailed,
    TxUnspecifiedError,
    useConnectedWallet,
    UserDenied
} from '@terra-money/wallet-provider';
import React from 'react';

export function useWithdraw(callback, callbackError) {
    const connectedWallet = useConnectedWallet()
    const contractAddress = "terra12tpndz0lhdntfv2hhrvjkn504e3yvazqwk4x8t"

    const withdraw = (id, msg) => {
        let dict = {}
        dict[msg] = {"id": id + ""}

        if (connectedWallet) {
            connectedWallet
                .post({
                    msgs: [
                        new MsgExecuteContract(
                            connectedWallet.walletAddress,
                            contractAddress,
                            dict,
                            0
                        )
                    ]
                })
                .then((result) => callback(result))
                .catch((error) => {
                    if (error instanceof UserDenied) {
                        callbackError('User Denied');
                    } else if (error instanceof CreateTxFailed) {
                        callbackError('Create Tx Failed: ' + error.message);
                    } else if (error instanceof TxFailed) {
                        callbackError('Tx Failed: ' + error.message);
                    } else if (error instanceof Timeout) {
                        callbackError('Timeout');
                    } else if (error instanceof TxUnspecifiedError) {
                        callbackError('Unspecified Error: ' + error.message);
                    } else {
                        callbackError('Unknown Error: ' + (error instanceof Error ? error.message : String(error)),
                        );
                    }
                });
        }
    }
    return {withdraw}
}

export default useWithdraw
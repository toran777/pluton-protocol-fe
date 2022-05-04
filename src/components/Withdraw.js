import {MsgExecuteContract} from '@terra-money/terra.js';
import {useConnectedWallet} from '@terra-money/wallet-provider';
import React from 'react';
import {contractAddress, getErrorMessage} from "./Utility";

export function useWithdraw(callback, callbackError) {
    const connectedWallet = useConnectedWallet()

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
                    const errorMessage = getErrorMessage(error)
                    callbackError(errorMessage)
                })
        }
    }

    return {withdraw}
}

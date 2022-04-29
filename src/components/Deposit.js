import React from 'react';
import {MsgExecuteContract} from '@terra-money/terra.js';
import {useConnectedWallet} from '@terra-money/wallet-provider';
import {contractAddress, getErrorMessage} from "./Utility";

export function useDeposit(callback, callbackError) {
    const connectedWallet = useConnectedWallet();

    const deposit = (msg) => {
        if (connectedWallet) {
            connectedWallet.post({
                msgs: [
                    new MsgExecuteContract(
                        connectedWallet.walletAddress,
                        contractAddress, {
                            "deposit": {
                                "denom": "uusd",
                                "beneficiary": msg.beneficiaryAddress,
                                "beneficiary_amount": msg.lockAmount,
                            }
                        }, {uusd: msg.amount * 1000000}
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

    return {deposit}
}

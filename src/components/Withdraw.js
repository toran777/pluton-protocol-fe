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

export function useWithdraw() {
    const connectedWallet = useConnectedWallet();
    const contractAddress = "terra1hd69jqjm8k5u6q53jm0kxpafgm95zr5faa2hgn"

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
                .catch((error) => {
                    console.log(error)
                });
        }
    }
    return {withdraw}
}

export default useWithdraw
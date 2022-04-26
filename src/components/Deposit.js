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

export function useDeposit() {
    const connectedWallet = useConnectedWallet();
    const contractAddress = "terra1hd69jqjm8k5u6q53jm0kxpafgm95zr5faa2hgn"

    const deposit = (msg) => {

        if (connectedWallet) {

            // add if condition for type

            connectedWallet
                .post({
                    msgs: [
                        new MsgExecuteContract(
                            connectedWallet.walletAddress,
                            contractAddress,
                            {
                                "deposit": {
                                    "denom": "uusd",
                                    "beneficiary": msg.beneficiaryAddress,
                                    "beneficiary_amount": msg.lockAmount,
                                }
                            },
                            {uusd: msg.amount * 1000000}
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
    return {deposit}
}

export default useDeposit
/*import React from 'react';
import {MsgExecuteContract} from '@terra-money/terra.js';
import {useConnectedWallet} from '@terra-money/wallet-provider';
import {getErrorMessage, profileAddress} from "./Utility";

export function useRegister() {
    const connectedWallet = useConnectedWallet();

    const register = (item) => {

        if (connectedWallet) {

            connectedWallet
                .post({
                    msgs: [
                        new MsgExecuteContract(
                            connectedWallet.walletAddress,
                            profileAddress,
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
                            {uusd: msg.amount * 1000000}
                        )
                    ]
                })
                .catch((error) => {
                    const errorMessage = getErrorMessage(error)
                });
        }
    }
    return {register}
}*/

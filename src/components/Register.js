import React from 'react';
import {MsgExecuteContract} from '@terra-money/terra.js';
import {useConnectedWallet} from '@terra-money/wallet-provider';
import {getErrorMessage, profileAddress} from "./Utility";

export function useRegister(callback, callbackError) {
    const connectedWallet = useConnectedWallet()

    const register = (profile) => {
        if (connectedWallet) {
            connectedWallet.post({
                msgs: [new MsgExecuteContract(connectedWallet.walletAddress, profileAddress, {
                    "register": {
                        "img": profile.img,
                        "name": profile.name,
                        "description": profile.description,
                        "github": profile.github,
                        "linkedin": profile.linkedin,
                        "twitter": profile.twitter
                    }}, 0)
                ]})
                .then((result) => callback(result))
                .catch((error) => {
                    const errorMessage = getErrorMessage(error)
                    callbackError(errorMessage)
                });
        }
    }

    return {register}
}

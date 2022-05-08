import {CreateTxFailed, Timeout, TxFailed, TxUnspecifiedError, UserDenied} from "@terra-money/wallet-provider";

export function truncateAddress(address) {
    if (address === undefined || address.length === 0)
        return ''

    return address.substring(0, 6) + "..." + address.substring(address.length - 6, address.length);
}

export function getErrorMessage(error) {
    let result

    if (error instanceof UserDenied) result = 'User Denied'
    else if (error instanceof CreateTxFailed) result = 'Create Tx Failed: ' + error.message
    else if (error instanceof TxFailed) result = 'Tx Failed: ' + error.message
    else if (error instanceof Timeout) result = 'Timeout'
    else if (error instanceof TxUnspecifiedError) result = 'Unspecified Error: ' + error.message
    else result = 'Unknown Error: ' + (error instanceof Error ? error.message : String(error))

    return result
}

export function validateInputProfile() {

}

export function validateInputFund(fund) {
    if (fund.beneficiaryAddress === undefined || fund.beneficiaryAddress.length === 0 || fund.beneficiaryAddress.length !== 44)
        return {address: true}
    if (fund.amount === undefined || fund.amount <= 0)
        return {address: false, amount: true}
    if (fund.lockAmount === undefined || fund.lockAmount.length === 0 || fund.lockAmount < 0)
        return {address: false, amount: false, lockAmount: true}

    return {lockAmount: false, amount: false, address: false}
}

export const contractAddress = "terra12tpndz0lhdntfv2hhrvjkn504e3yvazqwk4x8t"
export const profileAddress = "terra1s6v2km9zd33wemr492la8tvjkll2dhnmguz64x"
export const treedomAddress = "terra1umw8s7n8pzcnwn6n5pnr9574gy739nuwy4rk2a"
export const developerAddress = "terra1umw8s7n8pzcnwn6n5pnr9574gy739nuwy4rk2a"
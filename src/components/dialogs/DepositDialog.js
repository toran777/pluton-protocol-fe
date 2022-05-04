import {useState} from "react";
import {useDeposit} from "../Deposit";
import {WaitingDialog} from "./WaitingDialog";
import {ResultDialog} from "./ResultDialog";
import {ErrorDialog} from "./ErrorDialog";
import {AddInfoDialog} from "./AddInfoDialog";

export function DepositDialog({show, onHide, onResult, hideLockAmount = false, address=''}) {
    const [msg, setMsg] = useState({beneficiaryAddress: "", lockAmount: "", amount: ""})
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState({txHash: ""})
    const [error, setError] = useState()
    const {deposit} = useDeposit(callback, callbackError)

    let currentModal;

    function callback(item) {
        setResult({txHash: item.result.txhash})
        setLoading(false)
        onResult()
    }

    function callbackError(err) {
        setError(err)
        setLoading(false)
    }

    function reset() {
        onHide()
        setError(null)
        setResult({txHash: ''})
        setLoading(false)
    }

    if (error) {
        currentModal = <ErrorDialog show={show} onHide={reset} error={error} />
    } else if (!loading && !result.txHash) {
        currentModal = <AddInfoDialog address={address} hideLockAmount={hideLockAmount} show={show} onHide={onHide} onSubmit={(msg) => {
            setLoading(true)
            setMsg(msg)
            deposit(msg)
        }} />
    } else if (loading) {
        currentModal = <WaitingDialog show={show} onHide={onHide} />
    } else if (!loading && result.txHash) {
        currentModal = <ResultDialog show={show} onHide={() => {
            reset()
        }} msg={msg} result={result} />
    }

    return (currentModal)
}

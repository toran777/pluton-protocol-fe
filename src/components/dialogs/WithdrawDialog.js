import {useEffect, useState} from "react";
import {ErrorDialog} from "./ErrorDialog";
import {WaitingDialog} from "./WaitingDialog";
import {ResultDialog} from "./ResultDialog";
import {useWithdraw} from "../Withdraw";

export function WithdrawDialog({item, show, onHide, onResult}) {
    const [loading, setLoading] = useState(true)
    const [result, setResult] = useState({txHash: ""})
    const [error, setError] = useState()
    const [done, setDone] = useState(false)
    const {withdraw} = useWithdraw(callback, callbackError)
    const msg = {beneficiary_addr: "", amount: ""}

    function callback(item) {
        setResult({txHash: item.result.txhash})
        onResult(item)
        setLoading(false)
    }

    function callbackError(err) {
        setError(err)
    }

    function reset() {
        onHide()
        setError(null)
        setResult(null)
        setDone(false)
        setLoading(true)
    }

    let currentModal;

    useEffect(() => {
        const doWithdraw = async() => {
            if (loading && show) {
                withdraw(item.id, item.msg)
                setDone(true)
            }
        }

        !done && doWithdraw();
    })

    if (error) {
        currentModal = <ErrorDialog
            show={show}
            onHide={reset}
            error={error} />
    } else if (loading) {
        currentModal = <WaitingDialog show={show} onHide={onHide} />
    } else if (!loading && result.txHash) {
        currentModal = <ResultDialog show={show} onHide={reset} result={result} msg={msg} />
    }

    return (currentModal)
}

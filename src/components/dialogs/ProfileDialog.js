import {useState} from "react";
import {useRegister} from "../Register";
import {AddInfoProfile} from "./AddInfoProfile";
import {ErrorDialog} from "./ErrorDialog";
import {WaitingDialog} from "./WaitingDialog";
import {ResultDialog} from "./ResultDialog";

export function ProfileDialog({show, onHide}) {
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState({txHash: ""})
    const [error, setError] = useState()
    const {register} = useRegister(callback, callbackError)

    let currentModal

    function callback(item) {
        setResult({txHash: item.result.txhash})
        setLoading(false)
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

    if (error)
        currentModal = <ErrorDialog show={show} onHide={reset} error={error} />
    else if (!loading && !result.txHash)
        currentModal = <AddInfoProfile show={show} onHide={onHide} onSubmit={(profile) => {
            setLoading(true)
            register(profile)
        }} />
    else if (loading)
        currentModal = <WaitingDialog show={show} onHide={onHide} />
    else if (!loading && result.txHash)
        currentModal = <ResultDialog show={show} onHide={() => {reset()}} msg={""} result={result} />

    return (currentModal)
}
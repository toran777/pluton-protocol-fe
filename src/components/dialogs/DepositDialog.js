import {Form, Modal} from "react-bootstrap";
import {Button, Grid} from "@material-ui/core";
import {useDeposit} from "../Deposit";
import {useState} from "react";
import {WaitingDialog} from "./WaitingDialog";
import {ResultDialog} from "./ResultDialog";
import {ErrorDialog} from "./ErrorDialog";
import './DepositDialog.css';

export function DepositDialog({show, onHide, onResult}) {
    const [msg, setMsg] = useState({beneficiaryAddress: "", lockAmount: "", amount: ""})
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState({txHash: ""})
    const [error, setError] = useState()
    const {deposit} = useDeposit(callback, callbackError)

    let currentModal;

    function callback(item) {
        setResult({txHash: item.result.txhash})
        setLoading(false)
        onResult(item)
    }

    function callbackError(err) {
        setError(err)
        setLoading(false)
    }

    const firstModal = <Modal
        show={show}
        onHide={onHide}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Fund
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Beneficiary Address</Form.Label>
                    <Form.Control
                        onChange={(event) => setMsg(prevDeposit => ({...prevDeposit, beneficiaryAddress: event.target.value}))}
                        placeholder="Enter beneficiary address"
                        type={"text"}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                        onChange={(event) => setMsg(prevDeposit => ({...prevDeposit, amount: event.target.value}))}
                        placeholder="Enter UST Amount"
                        type={"number"}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Lock Amount</Form.Label>
                    <Form.Control
                        onChange={(event) => setMsg(prevDeposit => ({...prevDeposit, lockAmount: event.target.value}))}
                        placeholder="Enter Lock Amount"
                        type={"number"}/>
                    <Form.Text className="text-muted">
                        Your funds will be locked until the Lock Amount is reached.
                    </Form.Text>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Grid container justifyContent="center">
                <Button variant="contained"
                        onClick={() => {
                            deposit(msg)
                            setLoading(true)
                        }}>Deposit
                </Button>
            </Grid>
        </Modal.Footer>
    </Modal>

    if (error) {
        currentModal = <ErrorDialog
            show={show}
            onHide={onHide}
            error={error} />
    } else if (!loading && !result.txHash) {
        currentModal = firstModal
    } else if (loading) {
        currentModal = <WaitingDialog show={show} onHide={onHide} />
    } else if (!loading && result.txHash) {
        currentModal = <ResultDialog show={show} onHide={onHide} msg={msg} result={result} />
    }

    return (currentModal)
}

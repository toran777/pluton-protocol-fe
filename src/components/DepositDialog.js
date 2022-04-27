import {Form, Modal, Spinner} from "react-bootstrap";
import {Button, Grid} from "@material-ui/core";
import {useDeposit} from "./Deposit";
import {useState} from "react";
import './DepositDialog.css';
import truncateAddress from "./Utility";

function DepositDialog(props) {
    const [msg, setMsg] = useState({beneficiaryAddress: "", lockAmount: "", amount: ""})
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState({txHash: ""})
    const [error, setError] = useState()
    const [showing, setShowing] = useState(true)
    const {deposit} = useDeposit(callback, callbackError)

    let currentModal;

    function callback(item) {
        setResult({txHash: item.result.txhash})
        setLoading(false)
    }

    function callbackError(err) {
        setError(err)
        setLoading(false)
    }

    const firstModal = <Modal
        {...props}
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
                    <Form.Control onChange={(event) => setMsg(prevDeposit => ({
                        ...prevDeposit, beneficiaryAddress: event.target.value
                    }))} placeholder="Enter beneficiary address"/>
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
                        onChange={(event) => setMsg(prevDeposit => ({
                            ...prevDeposit, lockAmount: event.target.value
                        }))} placeholder="Enter Lock Amount" type={"number"}/>
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

    const secondModal = <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Body className={"col-12"}>
            <div className={"col-12 p-5 text-center"}>
                <h3>Waiting for Terra Station...</h3>
            </div>
            <div className={"col-12 p-5 text-center"}>
                <Spinner animation={"border"}/>
            </div>
            <div className={"col-12 p-5 text-center"}>
                Transaction broadcasted. Please wait.
            </div>
        </Modal.Body>
    </Modal>

    const thirdModal = <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        show={showing}
        centered>
        <Modal.Body className={"col-12 custom-modal"}>
            <div className={"col-12 p-5 text-center"}>
                <h3>Complete!</h3>
            </div>
            <div className={"row col-12 p-2 justify-content-between"}>
                <div className={"col-6"}>
                    Beneficiary Address
                </div>
                <div className={"col-4"}>
                    {truncateAddress(msg.beneficiaryAddress)}
                </div>
            </div>
            <div className={"row col-12 p-2 justify-content-between"}>
                <div className={"col-6"}>
                    Deposit Amount
                </div>
                <div className={"col-4"}>
                    {msg.amount + " UST"}
                </div>
            </div>
            <div className={"row col-12 p-2 justify-content-between"}>
                <div className={"col-6"}>
                    Tx Hash
                </div>
                <div className={"col-4"}>
                    <a href={"https://www.google.com"}>{truncateAddress(result.txHash)}</a>
                </div>
            </div>
            <Button variant={"contained"} className={"col-12 p-2 mt-3 button text-white"} onClick={() => {
                setShowing(false)
            }}>Ok</Button>
        </Modal.Body>
    </Modal>

    const errorModal = <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        show={showing}
        centered>
        <Modal.Body className={"col-12 custom-modal"}>
            <div className={"col-12 p-5 text-center"}>
                <h3>Error!</h3>
            </div>
            <div className={"col-12"}>
                {error}
            </div>
            <Button variant={"contained"} className={"col-12 p-2 mt-3 button text-white"} onClick={() => {
                setShowing(false)
            }}>Ok</Button>
        </Modal.Body>
    </Modal>

    if (!loading && !result.txHash) {
        currentModal = firstModal
    } else if (loading) {
        currentModal = secondModal
    } else if (!loading && result.txHash) {
        currentModal = thirdModal
    } else if (error) {
        currentModal = errorModal
    }

    return (currentModal);
}

export default DepositDialog;
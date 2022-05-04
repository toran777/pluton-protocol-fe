import {Form, Modal} from "react-bootstrap";
import {Button} from "@material-ui/core";
import {useState} from "react";

export function AddInfoDialog({show, onHide, onSubmit, address}) {
    const [msg, setMsg] = useState({beneficiaryAddress: address, lockAmount: "", amount: ""})

    function onTextChange(event, key) {
        const message = msg
        message[key] = event.target.value
        setMsg(message)
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="md"
            centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Fund
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {
                        address.length === 0 && <Form.Group className="mb-3">
                            <Form.Label>Beneficiary Address</Form.Label>
                            <Form.Control
                                onChange={(event) => onTextChange(event, 'beneficiaryAddress')}
                                placeholder="Enter beneficiary address"
                                type={"text"}/>
                        </Form.Group>
                    }

                    <Form.Group className="mb-3">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            onChange={(event) => onTextChange(event, 'amount')}
                            placeholder="Enter UST Amount"
                            type={"number"}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Lock Amount</Form.Label>
                        <Form.Control
                            onChange={(event) => onTextChange(event, 'lockAmount')}
                            placeholder="Enter Lock Amount"
                            type={"number"}/>
                        <Form.Text className="text-muted">
                            Your funds will be locked until the Lock Amount is reached.
                        </Form.Text>
                    </Form.Group>
                </Form>
                <Button
                    variant={"contained"}
                    onClick={() => onSubmit(msg)}
                    className={"col-12 p-2 mt-3 custom-btn text-white"}
                    type={"submit"}>Deposit
                </Button>
            </Modal.Body>
        </Modal>)
}

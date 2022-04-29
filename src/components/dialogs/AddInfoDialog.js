import {Form, Modal} from "react-bootstrap";
import {Button} from "@material-ui/core";
import {useState} from "react";

export function AddInfoDialog({show, onHide, onSubmit}) {
    const [msg, setMsg] = useState({beneficiaryAddress: "", lockAmount: "", amount: ""})

    return (
        <Modal
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
                            onChange={(event) => setMsg(prevDeposit => ({
                                ...prevDeposit,
                                beneficiaryAddress: event.target.value
                            }))}
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
                            onChange={(event) => setMsg(prevDeposit => ({
                                ...prevDeposit,
                                lockAmount: event.target.value
                            }))}
                            placeholder="Enter Lock Amount"
                            type={"number"}/>
                        <Form.Text className="text-muted">
                            Your funds will be locked until the Lock Amount is reached.
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant={"contained"}
                    className={"col-12 p-2 mt-3 custom-btn text-white"}
                    onClick={() => {
                        onHide()
                    }}>Deposit
                </Button>
            </Modal.Footer>
        </Modal>)
}

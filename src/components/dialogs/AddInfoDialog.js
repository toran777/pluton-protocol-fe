import {Form, Modal} from "react-bootstrap";
import {Button} from "@material-ui/core";
import {useState} from "react";
import {validateInputFund} from "../Utility";

export function AddInfoDialog({show, onHide, onSubmit, hideLockAmount, address = ''}) {
    const [msg, setMsg] = useState({beneficiaryAddress: '', lockAmount: '', amount: ''})
    const [errors, setErrors] = useState({lockAmount: false, amount: false, address: false})
    const [validated, setValidated] = useState(false)

    function onTextChange(event, key) {
        const message = msg
        message[key] = event.target.value
        setMsg(message)

        const valid = validateInputFund(msg)
        setErrors(valid)
    }

    let defaultLockAmount = hideLockAmount ? 0 : ''

    const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            onSubmit(msg)
        }

        setValidated(true)
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="md"
            className={"custom-modal"}
            centered>
            <Modal.Header closeButton>
                <Modal.Title>Fund</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="validationCustom03">
                        <Form.Label>Beneficiary Address</Form.Label>
                        <Form.Control
                            onChange={(event) => onTextChange(event, 'beneficiaryAddress')}
                            required={true}
                            placeholder="Enter beneficiary address"
                            type={"text"}
                            readOnly={address.length > 0}
                            defaultValue={address}
                            isInvalid={msg.address === undefined || msg.address.length !== 44}
                        />
                        <Form.Control.Feedback type="invalid">
                            Terra address is not valid!
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            onChange={(event) => onTextChange(event, 'amount')}
                            required={true}
                            placeholder="Enter UST Amount"
                            type={"number"}
                            isInvalid={errors.amount}
                        />
                        <Form.Control.Feedback type={"invalid"}>
                            The amount has to be at least 1 UST!
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Lock Amount</Form.Label>
                        <Form.Control
                            onChange={(event) => onTextChange(event, 'lockAmount')}
                            required={true}
                            placeholder="Enter Lock Amount"
                            type={"number"}
                            readOnly={hideLockAmount}
                            defaultValue={defaultLockAmount}
                            isInvalid={errors.lockAmount}/>
                        <Form.Text className="text-muted">
                            Your funds will be locked until the Lock Amount is reached.
                        </Form.Text>
                        <Form.Control.Feedback type={"invalid"}>
                            The lock amount has to be at least 0 UST!
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button
                        variant={"contained"}
                        className={"col-12 p-2 mt-3 custom-btn text-white"}
                        type={"submit"}>Deposit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

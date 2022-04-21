import {Modal, Form} from "react-bootstrap";
import {Grid, Button} from "@material-ui/core";
import {useDeposit} from "./Deposit";
import {useState} from "react";

function DepositDialog(props) {
    const [msg, setMsg] = useState({beneficiaryAddress: "", lockAmount: "", amount: ""}) 
    const { deposit } = useDeposit()
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Fund
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Beneficiary Address</Form.Label>
                <Form.Control onChange={(event) => setMsg(prevDeposit => ({...prevDeposit, beneficiaryAddress: event.target.value}))}  placeholder="Enter beneficiary address" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Amount</Form.Label>
                <Form.Control onChange={(event) => setMsg(prevDeposit => ({...prevDeposit, amount: event.target.value}))} placeholder="Enter UST Amount" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Lock Amount</Form.Label>
                <Form.Control onChange={(event) => setMsg(prevDeposit => ({...prevDeposit, lockAmount: event.target.value}))} placeholder="Enter Lock Amount" />
                <Form.Text className="text-muted">
                Your funds will be locked until the Lock Amount is reached.
                </Form.Text>
            </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Grid container justify="center">
            <Button variant = "contained" onClick={() => deposit(msg)}>Deposit</Button>
        </Grid>
      </Modal.Footer>
    </Modal>
  );
}


export default DepositDialog;
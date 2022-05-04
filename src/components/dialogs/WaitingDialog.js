import {Modal, Spinner} from "react-bootstrap";

export function WaitingDialog({show, onHide}) {
    return (
        <Modal
            show={show}
            onHide={onHide}
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
    )
}

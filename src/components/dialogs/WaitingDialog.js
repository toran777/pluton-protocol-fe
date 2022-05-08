import {Modal} from "react-bootstrap";
import { SpinnerDotted } from 'spinners-react';

export function WaitingDialog({show, onHide}) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="md"
            className={"custom-modal"}
            centered>
            <Modal.Body className={"col-12"}>
                <div className={"col-12 h3 p-5 text-center"}>
                    Waiting for Terra Station
                </div>
                <div className={"col-12 p-5 text-center"}>
                    <SpinnerDotted enabled={true} color={"black"}  />
                </div>
                <div className={"col-12 p-5 h6 text-center"}>
                    Transaction broadcasted. Please wait...
                </div>
            </Modal.Body>
        </Modal>
    )
}

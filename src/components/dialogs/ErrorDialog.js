import {Modal} from "react-bootstrap";
import {Button} from "@material-ui/core";

export function ErrorDialog({show, error, onHide}) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body className={"col-12 custom-modal"}>
                <div className={"col-12 p-5 text-center"}>
                    <h3>Error!</h3>
                </div>
                <div className={"col-12"}>
                    {error}
                </div>
                <Button
                    variant={"contained"}
                    className={"col-12 p-2 mt-3 custom-btn text-white"}
                    onClick={() => {
                        onHide()
                    }}>Ok</Button>
            </Modal.Body>
        </Modal>
    )
}

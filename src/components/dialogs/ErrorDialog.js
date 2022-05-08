import {Modal} from "react-bootstrap";
import {Button} from "@material-ui/core";
import {BsExclamationCircle} from "react-icons/bs";

export function ErrorDialog({show, error, onHide}) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="md"
            className={"custom-modal"}
            centered>
            <Modal.Body className={"p-5"}>
                <div className={"col-12 pt-3 text-center"}>
                    <BsExclamationCircle size={100} color={"#e95979"} />
                    <div className={"h3 pt-3"}>Error!</div>
                </div>
                <hr className={"custom-hr"} />
                <div className={"col-12 pt-3 h6 text-center"}>
                    {error}
                </div>
                <div className={"col-12 pt-3"}>
                    <Button
                        variant={"contained"}
                        className={"col-12 custom-btn text-white"}
                        onClick={onHide}>Ok
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

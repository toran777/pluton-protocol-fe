import {Modal} from "react-bootstrap";
import {truncateAddress} from "../Utility";
import {Button} from "@material-ui/core";
import {BsCheckCircle} from "react-icons/bs";

export function ResultDialog({show, msg, result, onHide}) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="md"
            className={"custom-modal"}
            centered>
            <Modal.Body className={"p-5"}>
                <div className={"col-12 pt-3 text-center"}>
                    <BsCheckCircle size={100} color={"#4bdb4b"} />
                    <div className={"h3 pt-3"}>Complete!</div>
                </div>
                <hr className={"custom-hr"} />
                {
                    msg.amount && <div className={"col-12 pt-4 small justify-content-between d-flex"}>
                        <div className={"col-6"}>Deposit Amount</div>
                        <div className={"col-6 text-end"}>{msg.amount + " UST"}</div>
                    </div>
                }
                {
                    msg.beneficiaryAddress && <div className={"col-12 pt-4 small justify-content-between d-flex"}>
                        <div className={"col-6"}>Beneficiary Address</div>
                        <div className={"col-6 text-end"}>{truncateAddress(msg.beneficiaryAddress)}</div>
                    </div>
                }
                <div className={"col-12 pt-4 small justify-content-between d-flex"}>
                    <div className={"col-6"}>Tx Hash</div>
                    <div className={"col-6 text-end"}>
                        <a href={"https://terrasco.pe/testnett/tx/" + result.txHash} target={"_blank"}>{truncateAddress(result.txHash)}</a>
                    </div>
                </div>
                <div className={"col-12 pt-4"}>
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

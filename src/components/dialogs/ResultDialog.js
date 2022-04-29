import {Modal} from "react-bootstrap";
import {truncateAddress} from "../Utility";
import {Button} from "@material-ui/core";

export function ResultDialog({show, msg, result, onHide}) {
    return (<Modal
            show={show}
            onHide={onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
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
                        <a href={"https://terrasco.pe/testnett/tx/" + result.txHash} target={"_blank"}>{truncateAddress(result.txHash)}</a>
                    </div>
                </div>
                <Button
                    variant={"contained"}
                    className={"col-12 p-2 mt-3 custom-btn text-white"}
                    onClick={() => {
                        onHide()
                    }}>Ok</Button>
            </Modal.Body>
        </Modal>)
}

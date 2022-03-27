import {Button, Container, Modal, Nav, Navbar} from "react-bootstrap";
import './Header.css';
import {useState} from "react";
import {useWallet, WalletStatus} from '@terra-money/wallet-provider';
import WalletButton from "./WalletButton";
import './WalletButton.css';

function Header({walletAddress, balanceAmount}) {
    const {
        status, availableConnections, connect, disconnect,
    } = useWallet();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (<Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="/">
                <img
                    alt=""
                    src={"logo.png"}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />
                Brand Link
            </Navbar.Brand>
            <Navbar.Collapse className={"justify-content-end"}>
                <Nav>
                    {status === WalletStatus.WALLET_NOT_CONNECTED && (<Nav.Item className={"custom-wallet-btn"}>
                            <Button className={"btn btn-dark custom-wallet-btn"} onClick={handleShow}>Connect</Button>
                        </Nav.Item>)}
                    {status === WalletStatus.WALLET_CONNECTED && (<Nav.Item>
                            <WalletButton onClick={() => {
                                disconnect()
                                handleClose()
                            }} walletAddress={walletAddress} balanceAmount={balanceAmount} coinType={"UST"}/>
                        </Nav.Item>)}
                </Nav>
            </Navbar.Collapse>

            <Modal
                size="sm" show={show} onHide={handleClose} centered>
                <Modal.Header>
                    <Modal.Title className={"text-center w-100"}>Connect Wallet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {status === WalletStatus.WALLET_NOT_CONNECTED && (<>
                        {availableConnections.map(({type, name, icon, identifier = ''}) => (
                            <button className="wallet-btn" key={'connection-' + type + identifier} onClick={() => {
                                connect(type, identifier)
                                handleClose()
                            }}>{name}
                                <img src={icon} alt={name} style={{width: '1em', height: '1em'}}/>
                            </button>))}
                    </>)}
                </Modal.Body>
            </Modal>
        </Container>
    </Navbar>);
}

export default Header;
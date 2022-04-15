import {Button, Container, Modal, Nav, Navbar} from "react-bootstrap";
import './Header.css';
import {useState} from "react";
import {useWallet, WalletStatus} from '@terra-money/wallet-provider';
import truncateAddress from "./Utility";

function Header({walletAddress, balanceAmount}) {
    const {status, availableConnections, connect, disconnect,} = useWallet();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (<Navbar variant="light" className="bg-transparent">
            <Container>
                <Navbar.Brand href="/">Pluton Protocol</Navbar.Brand>
                <Navbar.Collapse>
                    {status === WalletStatus.WALLET_NOT_CONNECTED && (<Nav className="col-4"/>)}

                    {status === WalletStatus.WALLET_CONNECTED && (<Nav className="col-4">
                            <Nav.Link href="/outgoing-payments">Payments</Nav.Link>
                            <Nav.Link href="/incoming-donations">Donations</Nav.Link>
                        </Nav>)}

                    <Nav className="col-8 justify-content-end">
                        {status === WalletStatus.WALLET_NOT_CONNECTED && (<Nav.Item>
                            <Button className={"btn btn-dark custom-btn"} onClick={handleShow}>Connect</Button>
                        </Nav.Item>)}
                        {status === WalletStatus.WALLET_CONNECTED && (<Nav.Item>
                            <button className={"btn btn-dark custom-btn-wallet"} onClick={() => {
                                disconnect()
                                handleClose()
                            }}>
                                <span>{truncateAddress(walletAddress)}</span>
                                <span className={"divider"}>|</span>
                                <span className={"balance-amount"}>{balanceAmount}</span>
                                <span className={"coin-type"}>UST</span>
                            </button>
                        </Nav.Item>)}
                    </Nav>
                </Navbar.Collapse>

                <Modal size="sm" show={show} onHide={handleClose} centered>
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
                                </button>))}</>)}
                    </Modal.Body>
                </Modal>
            </Container>
        </Navbar>);
}

export default Header;
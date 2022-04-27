import {Container, Form, Modal, Nav, Navbar} from "react-bootstrap";
import './Header.css';
import {useState} from "react";
import {useWallet, WalletStatus} from '@terra-money/wallet-provider';
import truncateAddress from "./Utility";
import {Link, useHistory} from "react-router-dom";
import {BsSearch} from "react-icons/bs";
import {Button} from "@mui/material";

function Header({walletAddress, balanceAmount}) {
    const {status, availableConnections, connect, disconnect,} = useWallet();

    const [show, setShow] = useState(false);
    const [value, setValue] = useState("")

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const history = useHistory()

    function onSearchProfile(event) {
        event.preventDefault()
        history.push('/profile/' + value)
    }

    return (<Navbar variant="light" className="bg-transparent">
        <Container>
            <Link to={"/home"} className={"navbar-brand"}>Pluton Protocol</Link>
            <Navbar.Collapse className={"col-12 col-md-8"}>
                {status === WalletStatus.WALLET_NOT_CONNECTED && (<Nav className="col-4"/>)}

                {status === WalletStatus.WALLET_CONNECTED && (
                    <Nav className="col-4 bg-gradient">
                        <Link to="/outgoing-payments" className={"nav-link"}>Payments</Link>
                        <Link to="/incoming-donations" className={"nav-link"}>Donations</Link>
                        <Link to={"/profile/" + walletAddress} className={"nav-link"}>Profile</Link>
                    </Nav>)}
                <Nav className="col-8 p-2 justify-content-end">
                    {status === WalletStatus.WALLET_CONNECTED && (
                        <Form className={"col-4 p-2"}>
                            <input className={"custom-search col-10"} type="search" placeholder="Search" value={value}
                                   onChange={(event) => {setValue(event.target.value)}}
                                   onKeyPress={event => {
                                       if (event.key === 'Enter') {
                                           onSearchProfile(event)
                                       }
                                   }
                                   }/>
                            <BsSearch/>
                        </Form>)
                    }
                    <div className={"p-2 col-4"}>
                        {status === WalletStatus.WALLET_NOT_CONNECTED && (
                            <Nav.Item>
                                <Button variant={"contained"} className={"btn btn-dark custom-btn"} onClick={handleShow}>Connect</Button>
                            </Nav.Item>)
                        }
                        {status === WalletStatus.WALLET_CONNECTED && (<Nav.Item>
                            <Button variant={"contained"} className={"btn btn-dark custom-btn-wallet"} onClick={() => {
                                disconnect()
                                handleClose()
                                history.push("/")
                            }}>
                                <span>{truncateAddress(walletAddress)}</span>
                                <span className={"divider"}>|</span>
                                <span className={"balance-amount"}>{balanceAmount}</span>
                                <span className={"coin-type"}>UST</span>
                            </Button>
                        </Nav.Item>)}
                    </div>
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
import {Container, Nav, Navbar} from "react-bootstrap";
import {useWallet, WalletStatus} from '@terra-money/wallet-provider';
import truncateAddress from "./Utility";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import './Header.css';

export function Header({walletAddress, balanceAmount}) {
    const {status, connect, disconnect} = useWallet()
    let currentButton;
    let body;

    if (status !== WalletStatus.WALLET_CONNECTED) {
        currentButton = <Button
            variant={"contained"}
            className={"custom-btn-wallet"}
            onClick={() => connect()}>Connect
        </Button>

        body = <div className={"col-md-4"}></div>
    } else {
        currentButton = <Button
            variant={"contained"}
            className={"custom-btn-wallet"}
            onClick={() => {
                disconnect()
                history.push("/")
            }}>
            <span>{truncateAddress(walletAddress)}</span>
            <span className={"divider"}>|</span>
            <span className={"balance-amount"}>{balanceAmount}</span>
            <span className={"coin-type"}>UST</span>
        </Button>

        body = <Nav className="col-md-4">
            <Link to="/payments" className={"nav-link"}>Payments</Link>
            <Link to="/donations" className={"nav-link"}>Donations</Link>
            <Link to={"/profile/" + walletAddress} className={"nav-link"}>Profile</Link>
        </Nav>
    }

    return (
        <Navbar collapseOnSelect expand={"lg"} variant={"light"}>
            <Container className={"col-lg-12 col-md-10"}>
                <Link to={"/home"} className={"navbar-brand"}>Pluton Protocol</Link>
                <Navbar.Toggle aria-controls={"responsive-nav"}/>
                <Navbar.Collapse className={"responsive-nav"}>
                    {body}
                    <Nav className="col-md-8 col-sm-8 justify-content-end">
                        <Nav.Item className={"col-md-4 col-sm-8"}>{currentButton}</Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
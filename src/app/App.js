import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import {useConnectedWallet, useLCDClient} from "@terra-money/wallet-provider";
import HomePage from "../components/HomePage";
import {BrowserRouter as Router, Switch, Route, Redirect,} from "react-router-dom";
import Card from "../components/Card";
import data from '../data.json';

function App() {

    const [incomingPayments, setIncomingPayments] = useState([]);
    const [outgoingPayments, setOutgoingPayments] = useState([]);
    const [balance, setBalance] = useState();
    const [walletAddress, setWalletAddress] = useState();

    const lcd = useLCDClient();
    const connectedWallet = useConnectedWallet();
    const contractAddress = "terra14e0u4xwmgvq28x3fwszhue3hx4w8la3rng3rxr";

    useEffect(() => {
        /*if (connectedWallet) {
            setWalletAddress(connectedWallet.walletAddress);

            lcd.bank.balance(connectedWallet.walletAddress).then(([coins]) => {
                const balance = Number(coins.toDecCoins().get("uusd").div(1000000).toData().amount);
                setBalance(balance.toLocaleString());
            }).catch((error) => console.log(error));

            lcd.wasm.contractQuery(contractAddress, {
                depositor_balance: {
                    address: connectedWallet.walletAddress
                }
            }).then((r) => {
                const array = [];
                r.map(item => array.push(item[1]));
                setOutgoingPayments(array);
            }).catch((error) => console.log(error));

            lcd.wasm.contractQuery(contractAddress, {
                beneficiary_balance: {
                    address: connectedWallet.walletAddress
                }
            }).then((r) => {
                const array = [];
                r.map(item => array.push(item[1]));
                setIncomingPayments(array);
            }).catch((error) => console.log(error));
        }*/
        const array = [];
        data.map(item => array.push(item[1]));
        setIncomingPayments(array);
    }, [connectedWallet, lcd]);

    return (
        <div style={appStyle} className='App'>
            <Header walletAddress={walletAddress} balanceAmount={balance}/>
            <Router>
                <Switch>
                    <Route path="/home">
                        <HomePage />
                    </Route>
                    <Route path="/outgoing-payments">
                        <Card items={incomingPayments} type={"OUTGOING"} />
                    </Route>
                    <Route path="/incoming-payments">
                        <Card items={incomingPayments} type={"INCOMING"} />
                    </Route>
                    <Route>
                        <Redirect to="/home" />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

const appStyle = {
    backgroundColor: "#EDEDED", fontFamily: "Poppins, sans-serif", fontWeight: "Bold"
}

export default App;

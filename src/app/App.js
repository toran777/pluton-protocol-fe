import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import {useConnectedWallet, useLCDClient} from "@terra-money/wallet-provider";
import HomePage from "../components/HomePage";
import {BrowserRouter as Router, Redirect, Route, Switch,} from "react-router-dom";
import Card from "../components/Card";
import {Profile} from "../components/Profile";
import './App.css';

function App() {
    const [incomingPayments, setIncomingPayments] = useState([])
    const [outgoingPayments, setOutgoingPayments] = useState([])
    const [balance, setBalance] = useState()
    const [walletAddress, setWalletAddress] = useState()
    const [fetchPayments, setFetchPayments] = useState(true)

    const lcd = useLCDClient();
    const connectedWallet = useConnectedWallet()
    const depositContract = "terra1hd69jqjm8k5u6q53jm0kxpafgm95zr5faa2hgn"

    useEffect(() => {
        const getPayments = async () => {
            if (connectedWallet) {
                const array = []

                setIncomingPayments(array)
                setFetchPayments(false)

                setWalletAddress(connectedWallet.walletAddress);
                // Query wallet balance
                lcd.bank.balance(connectedWallet.walletAddress).then(([coins]) => {
                    const balance = Number(coins.toDecCoins().get("uusd").div(1000000).toData().amount);
                    setBalance(balance.toLocaleString());
                }).catch((error) => console.log(error));

                // Query depositor balance
                lcd.wasm.contractQuery(depositContract, {
                    depositor_balance: {
                        address: connectedWallet.walletAddress
                    }
                }).then((r) => {
                    const array = [];
                    r.map(item => array.push(item[1]));
                    setOutgoingPayments(array);
                }).catch((error) => console.log(error));

                // Query beneficiary balance
                lcd.wasm.contractQuery(depositContract, {
                    beneficiary_balance: {
                        address: connectedWallet.walletAddress
                    }
                }).then((r) => {
                    const array = [];
                    r.map(item => array.push(item[1]));
                    setIncomingPayments(array);
                }).catch((error) => console.log(error));

            }
        }

        fetchPayments && getPayments()

    }, [fetchPayments, connectedWallet, lcd]);

    return (
        <div className='App'>
            <Router>
                <Header walletAddress={walletAddress} balanceAmount={balance}/>
                <Switch>
                    <Route path="/home">
                        <HomePage/>
                    </Route>
                    <Route path="/outgoing-payments">
                        <Card items={outgoingPayments} type={"OUTGOING"}/>
                    </Route>
                    <Route path="/incoming-donations">
                        <Card items={incomingPayments} type={"INCOMING"}/>
                    </Route>
                    <Route path="/profile/:address" component={Profile}>
                    </Route>
                    <Route>
                        <Redirect to="/home"/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;

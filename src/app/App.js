import React, {useEffect, useState} from 'react';
import {useConnectedWallet, useLCDClient} from "@terra-money/wallet-provider";
import HomePage from "../components/HomePage";
import {BrowserRouter as Router, Redirect, Route, Switch,} from "react-router-dom";
import {Profile} from "../components/Profile";
import {Header} from "../components/Header";
import {Donations} from "../components/Donations";
import {Payments} from "../components/Payments";
import './App.css';

function App() {
    const [incomingPayments, setIncomingPayments] = useState([])
    const [outgoingPayments, setOutgoingPayments] = useState([])
    const [balance, setBalance] = useState()
    const [walletAddress, setWalletAddress] = useState()
    const [fetchPayments, setFetchPayments] = useState(true)
    const [loadingDonations, setLoadingDonations] = useState(true)
    const [loadingPayments, setLoadingPayments] = useState(true)

    const lcd = useLCDClient();
    const connectedWallet = useConnectedWallet()
    const depositContract = "terra12tpndz0lhdntfv2hhrvjkn504e3yvazqwk4x8t"

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
                    setLoadingDonations(false);
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
                    setLoadingPayments(false);
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
                    <Route path="/payments">
                        <Payments items={outgoingPayments} loading={loadingPayments}/>
                    </Route>
                    <Route path="/donations">
                        <Donations items={incomingPayments} loading={loadingDonations}/>
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

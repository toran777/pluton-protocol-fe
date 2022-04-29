import React, {useEffect, useState} from 'react';
import {useConnectedWallet, useLCDClient} from "@terra-money/wallet-provider";
import {HomePage} from "../components/core/HomePage";
import {BrowserRouter as Router, Redirect, Route, Switch,} from "react-router-dom";
import {Profile} from "../components/core/Profile";
import {Header} from "../components/core/Header";
import {Donations} from "../components/core/Donations";
import {Payments} from "../components/core/Payments";
import {contractAddress} from "../components/Utility";
import './App.css';

function App() {
    const [incomingPayments, setIncomingPayments] = useState([])
    const [outgoingPayments, setOutgoingPayments] = useState([])
    const [balance, setBalance] = useState(0)
    const [walletAddress, setWalletAddress] = useState("")
    const [fetchPayments, setFetchPayments] = useState(true)
    const [loadingDonations, setLoadingDonations] = useState(true)
    const [loadingPayments, setLoadingPayments] = useState(true)

    const lcd = useLCDClient();
    const connectedWallet = useConnectedWallet()

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
                    setBalance(balance);
                }).catch((error) => console.log(error));

                // Query depositor balance
                lcd.wasm.contractQuery(contractAddress, {
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
                lcd.wasm.contractQuery(contractAddress, {
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
                        <Payments items={outgoingPayments} loading={loadingPayments} refresh={(item) => {
                            setLoadingPayments(true)
                            console.log(item)
                        }}/>
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

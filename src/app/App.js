import React, {useEffect, useState} from 'react'
import Header from '../components/Header'
import {useConnectedWallet, useLCDClient} from "@terra-money/wallet-provider"
import HomePage from "../components/HomePage"
import {BrowserRouter as Router, Redirect, Route, Switch,} from "react-router-dom"
import Card from "../components/Card"
import data from '../data.json'

function App() {
    const [incomingPayments, setIncomingPayments] = useState([])
    const [outgoingPayments, setOutgoingPayments] = useState([])
    const [balance, setBalance] = useState()
    const [walletAddress, setWalletAddress] = useState()
    const [fetchPayments, setFetchPayments] = useState(true)

    const lcd = useLCDClient();
    const connectedWallet = useConnectedWallet()
    const contractAddress = "terra14e0u4xwmgvq28x3fwszhue3hx4w8la3rng3rxr"

    useEffect(() => {
        const getPayments = async () => {
            if (connectedWallet) {
                const array = []
                data.map(item => array.push(item[1]))

                setIncomingPayments(array)
                setFetchPayments(false)

                setWalletAddress(connectedWallet.walletAddress);

                lcd.bank.balance(connectedWallet.walletAddress).then(([coins]) => {
                    const balance = Number(coins.toDecCoins().get("uusd").div(1000000).toData().amount);
                    setBalance(balance.toLocaleString());
                }).catch((error) => console.log(error));

                const commonToken = [{token: "bLuna", address: "terra1u0t35drzyy0mujj8rkdyzhe264uls4ug3wdp3x"},
                    {token: "ANC", address: "terra1747mad58h0w4y589y3sk84r5efqdev9q4r02pc"}]

                lcd.wasm.contractQuery(contractAddress, {
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
        <div style={appStyle} className='App'>
            <Header walletAddress={walletAddress} balanceAmount={balance}/>
            <Router>
                <Switch>
                    <Route path="/home">
                        <HomePage/>
                    </Route>
                    <Route path="/outgoing-payments">
                        <Card items={incomingPayments} type={"INCOMING"}/>
                    </Route>
                    <Route path="/incoming-payments">
                        <Card items={incomingPayments} type={"INCOMING"}/>
                    </Route>
                    <Route>
                        <Redirect to="/home"/>
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

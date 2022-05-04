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
    const [donations, setDonations] = useState([])
    const [payments, setPayments] = useState([])
    const [balance, setBalance] = useState(0)
    const [walletAddress, setWalletAddress] = useState("")
    const [fetchPayments, setFetchPayments] = useState(true)
    const [loadingDonations, setLoadingDonations] = useState(true)
    const [loadingPayments, setLoadingPayments] = useState(true)

    const lcd = useLCDClient()
    const connectedWallet = useConnectedWallet()

    function getPayments() {
        // Query depositor balance
        setLoadingPayments(true)

        const loop = () => {
            const array = []
            lcd.wasm.contractQuery(contractAddress, {
                depositor_balance: {
                    address: connectedWallet.walletAddress
                }
            }).then((r) => {
                r.map(item => array.push(item[1]))

                if (array.length === payments.length) setTimeout(loop, 1000)
                else {
                    setPayments([...array])
                    setLoadingPayments(false)
                }

            }).catch((error) => console.log(error))
        }

        loop()
    }

    function getDonations() {
        // Query beneficiary balance
        setLoadingDonations(true)

        const loop = () => {
            const array = []
            lcd.wasm.contractQuery(contractAddress, {
                beneficiary_balance: {
                    address: connectedWallet.walletAddress
                }
            }).then((r) => {
                r.map(item => array.push(item[1]))

                if (array.length === donations.length) setTimeout(loop, 1000)
                else {
                    setDonations([...array])
                    setLoadingDonations(false)
                }
            }).catch((error) => console.log(error))
        }

        loop()
    }

    function getWalletBalance() {
        // Query wallet balance
        lcd.bank.balance(connectedWallet.walletAddress).then(([coins]) => {
            const balance = Number(coins.toDecCoins().get("uusd").div(1000000).toData().amount)
            setBalance(balance)
        }).catch((error) => console.log(error))
    }

    useEffect(() => {
        const queries = async () => {
            if (connectedWallet) {
                setFetchPayments(false)
                setWalletAddress(connectedWallet.walletAddress)

                getWalletBalance()
                getPayments()
                getDonations()
            }
        }

        fetchPayments && queries()

    }, [fetchPayments, connectedWallet, lcd])

    return (
        <div className='App'>
            <Router>
                <Header walletAddress={walletAddress} balanceAmount={balance}/>
                <Switch>
                    <Route path="/home">
                        <HomePage/>
                    </Route>
                    <Route path="/payments">
                        <Payments
                            items={payments}
                            loading={loadingPayments}
                            refresh={() => {
                                getPayments()
                                getWalletBalance()
                            }}
                        />
                    </Route>
                    <Route path="/donations">
                        <Donations
                            items={donations}
                            loading={loadingDonations}
                            refresh={() => {
                                getDonations()
                                getWalletBalance()
                            }}
                        />
                    </Route>
                    <Route path="/profile/:address" component={Profile}>
                    </Route>
                    <Route>
                        <Redirect to="/home"/>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App;

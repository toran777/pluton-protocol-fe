import React, {useEffect, useState} from 'react';
import {HomePage} from "../components/core/HomePage";
import {BrowserRouter as Router, Redirect, Route, Switch,} from "react-router-dom";
import {Profile} from "../components/core/Profile";
import {Header} from "../components/core/Header";
import {Donations} from "../components/core/Donations";
import {Payments} from "../components/core/Payments";
import {useConnectedWallet, useLCDClient} from "@terra-money/wallet-provider";
import './App.css';

function App() {
    const [balance, setBalance] = useState(0)
    const [walletAddress, setWalletAddress] = useState("")
    const [done, setDone] = useState(false)
    const lcd = useLCDClient()
    const connectedWallet = useConnectedWallet()

    function getWalletBalance() {
        // Query wallet balance
        const loop = () => {
            let number = 0
            lcd.bank.balance(connectedWallet.walletAddress).then(([coins]) => {
                number = Number(coins.toDecCoins().get("uusd").div(1000000).toData().amount)

                if (balance === number) setTimeout(loop, 2000)
                else setBalance(number)
            }).catch((error) => console.log(error))
        }

        loop()
    }

    useEffect(() => {
        const queries = async () => {
            if (connectedWallet) {
                setDone(false)
                setWalletAddress(connectedWallet.walletAddress)

                getWalletBalance()
            }
        }

        !done && queries()

    }, [done, connectedWallet, lcd])

    return (
        <div className='App'>
            <Router>
                <Header walletAddress={walletAddress} balanceAmount={balance}/>
                <Switch>
                    <Route path="/home">
                        <HomePage/>
                    </Route>
                    <Route path="/payments">
                        <Payments onTransaction={getWalletBalance}/>
                    </Route>
                    <Route path="/donations">
                        <Donations onTransaction={getWalletBalance}/>
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

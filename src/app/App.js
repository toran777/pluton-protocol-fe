import React, {useEffect, useState} from 'react';
import Header from './components/Header';
import CustomCard from "./components/Card";
import {useConnectedWallet, useLCDClient} from "@terra-money/wallet-provider";

function App() {

    const [incomingPayments, setIncomingPayments] = useState([]);
    const [outgoingPayments, setOutgoingPayments] = useState([]);
    const [balance, setBalance] = useState();
    const [walletAddress, setWalletAddress] = useState();

    const lcd = useLCDClient();
    const connectedWallet = useConnectedWallet();
    const contractAddress = "terra1e8jzqkmq5rfrsp2ttnnzvrqzh2vnvyrfjaguma";

    useEffect(() => {
        if (connectedWallet) {
            setWalletAddress(connectedWallet.walletAddress);

            lcd.bank.balance(connectedWallet.walletAddress).then(([coins]) => {
                const balance = Number(coins.toDecCoins().get("uusd").div(1000000).toData().amount);
                setBalance(balance.toLocaleString());
            }).catch((error) => console.log(error));

            /*lcd.wasm.contractQuery(contractAddress, {
                deposit_balance: {
                    address: connectedWallet.walletAddress, passphrase: "2"
                }
            }).then((r) => {
                const array = [];
                array.push(r);
                setOutgoingPayments(array);
            }).catch((error) => console.log(error));*/

            /*lcd.wasm.contractQuery(contractAddress, {
                withdrawable_interest: {
                    sender: connectedWallet.walletAddress, passphrase: "2"
                }
            }).then((r) => {
                console.log(r);
            }).catch((error) => console.log(error));*/
        }
    }, [connectedWallet, lcd]);

    return (<div style={appStyle} className='App'>
        <Header walletAddress={walletAddress}
                balanceAmount={balance}/>
        <CustomCard name={"Ongoing Donations"}
                    description={"Here's a list of your outgoing payments"}
                    items={outgoingPayments}
                    buttonName={"Withdraw"}/>
        <CustomCard name={"Incoming Donations"}
                    description={"Here's a list of your incoming payments"}
                    items={incomingPayments}
                    buttonName={"Claim"}/>
    </div>);
}

const appStyle = {
    height: "100vh", backgroundColor: "#EDEDED", fontFamily: "Poppins, sans-serif"
}

export default App;

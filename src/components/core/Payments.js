import {Card, Container, Table} from "react-bootstrap";
import {Button, Skeleton} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Page} from "../pagination/Pagination";
import {DepositDialog} from "../dialogs/DepositDialog";
import {WithdrawDialog} from "../dialogs/WithdrawDialog";
import {contractAddress, truncateAddress} from "../Utility";
import './Card.css';
import {useConnectedWallet, useLCDClient} from "@terra-money/wallet-provider";

export function Payments() {
    const [payments, setPayments] = useState([])
    const [loadingPayments, setLoadingPayments] = useState(true)
    const [done, setDone] = useState(false)
    const [modalShowFund, setModalShowFund] = useState(false)
    const [modalShowWithdraw, setModalShowWithdraw] = useState(false)
    const [currentItems, setCurrentItems] = useState([])
    const [selected, setSelected] = useState([])
    const placeholders = [1, 2, 3]
    const lcd = useLCDClient()
    const connectedWallet = useConnectedWallet()

    useEffect(() => {
        const query = async () => {
            if (connectedWallet) {
                setDone(true)
                getPayments()
            }
        }

        !done && query()

    }, [done, connectedWallet, lcd])

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

    let body

    if (payments.length > 0 && !loadingPayments) {
        body = currentItems.map((item) => (<tr key={item.id} className={"col-12"}>
            <td className={"col-3"}>
                <a href={"https://terrasco.pe/mainnet/address/" + item.beneficiary_addr} target={"_blank"}>{truncateAddress(item.beneficiary_addr)}</a>
            </td>
            <td className={"col-3 text-center"}>{item.amount / 1000000 + " UST"}</td>
            <td className={"col-3 text-center"}>{item.beneficiary_amount + " UST"}</td>
            <td className={"col-3 text-center"}>
                <Button
                    className={"custom-table-btn"}
                    onClick={() => {
                        item.msg = "withdrawal"
                        setSelected(item)
                        setModalShowWithdraw(true)
                    }}>Withdraw
                </Button>
            </td>
        </tr>))
    } else if (loadingPayments) {
        body = placeholders.map((item) => (<tr key={item} className={"col-12"}>
            <td className={"col-3"}>
                <Skeleton/>
            </td>
            <td className={"col-3"}>
                <Skeleton/>
            </td>
            <td className={"col-3"}>
                <Skeleton/>
            </td>
            <td className={"col-3"}>
                <Skeleton/>
            </td>
        </tr>))
    }

    return (<Container className={"col-sm-12 pb-3 col-md-8 col-lg-6 col-xl-6"}>
            <h1 className="text-center mt-5 col-12">Outgoing Payments</h1>
            <Card.Title className="text-center mt-3">Here's a list of your outgoing payments.</Card.Title>
            <Card className={"custom-card mt-5"}>
                <Card.Body>
                    {!loadingPayments && payments.length === 0 ? (<>
                        <div className={"text-center"}>It looks like you don't have any payments yet.</div>
                    </>) : (<>
                        <Table borderless={true}>
                            <thead className={"custom-header"}>
                            <tr className={"col-12"}>
                                <th className={"col-3"}>To</th>
                                <th className={"col-3 text-center"}>Amount</th>
                                <th className={"col-3 text-center"}>Lock Amount</th>
                                <th className={"col-3 text-center"}>Withdraw</th>
                            </tr>
                            </thead>
                            <tbody>
                            {body}
                            </tbody>
                        </Table>
                    </>)}
                </Card.Body>
            </Card>
            <Page items={payments}
                  loading={loadingPayments}
                  onItemsChange={(newItems) => {
                      setCurrentItems([...newItems])
                  }}/>
            <div className={"row mt-2 pb-5 justify-content-center"}>
                <div className={"col-5"}></div>
                <Button variant={"contained"}
                        className={"custom-btn text-white col-2"}
                        onClick={() => setModalShowFund(true)}>Fund</Button>
                <div className={"col-5"}></div>
            </div>
            <DepositDialog
                show={modalShowFund}
                onHide={() => setModalShowFund(false)}
                onResult={getPayments}/>
            <WithdrawDialog
                item={selected}
                show={modalShowWithdraw}
                onHide={() => setModalShowWithdraw(false)}
                onResult={getPayments}/>
        </Container>)
}

import {Card, Container, Table} from "react-bootstrap";
import {Button, Skeleton} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Page} from "../pagination/Pagination";
import {WithdrawDialog} from "../dialogs/WithdrawDialog";
import {contractAddress, truncateAddress} from "../Utility";
import './Card.css';
import {useConnectedWallet, useLCDClient} from "@terra-money/wallet-provider";

export function Donations(onTransaction) {
    const [donations, setDonations] = useState([])
    const [loadingDonations, setLoadingDonations] = useState(true)
    const [done, setDone] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [currentItems, setCurrentItems] = useState([])
    const [selected, setSelected] = useState([])
    const [reload, setReload] = useState(false)
    const placeholders = [1, 2, 3]
    const lcd = useLCDClient()
    const connectedWallet = useConnectedWallet()

    useEffect(() => {
        const query = async () => {
            if (connectedWallet) {
                setDone(true)
                getDonations()
            }
        }

        !done && query()

    }, [done, connectedWallet, lcd])

    function getDonations() {
        // Query beneficiary balance
        setLoadingDonations(true)
        setReload(false)

        let tries = 0

        const loop = () => {
            const array = []
            lcd.wasm.contractQuery(contractAddress, {
                beneficiary_balance: {
                    address: connectedWallet.walletAddress
                }
            }).then((r) => {
                r.map(item => array.push(item[1]))

                if (array.length === donations.length && tries < 5) {
                    tries += 1
                    setTimeout(loop, 2000)
                }
                else {
                    setDonations([...array])
                    setLoadingDonations(false)
                    setReload(true)
                }
            }).catch((error) => console.log(error))
        }

        loop()
    }

    let body

    if (donations.length > 0 && !loadingDonations) {
        body = currentItems.map((item) => (<tr key={item.id} className={"col-12"}>
            <td className={"col-3"}>
                <a href={"https://terrasco.pe/mainnet/address/" + item.depositor_addr} target={"_blank"}>{truncateAddress(item.depositor_addr)}</a>
            </td>
            <td className={"col-3 text-center"}>{item.amount / 1000000 + " UST"}</td>
            <td className={"col-3 text-center"}>{item.beneficiary_amount + " UST"}</td>
            <td className={"col-3 text-center"}>
                <Button
                    className={"custom-table-btn text-white"}
                    onClick={() => {
                        item.msg = "withdraw_interest"
                        setSelected(item)
                        setModalShow(true)
                    }}>Withdraw
                </Button>
            </td>
        </tr>))
    } else {
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

    return (
        <Container className={"col-sm-12 pb-3 col-md-8 col-lg-6 col-xl-6"}>
            <h1 className="text-center mt-5 col-12">Incoming Donations</h1>
            <Card.Title className="text-center mt-3">Here's a list of your incoming donations.</Card.Title>
            <Card className={"custom-card mt-5"}>
                <Card.Body>
                    {
                        !loadingDonations && donations.length === 0 ? (<>
                            <div className={"text-center"}>It looks like you don't have any donations yet.</div>
                        </>) : (<>
                            <Table borderless={true}>
                                <thead className={"custom-header"}>
                                <tr className={"col-12"}>
                                    <th className={"col-3"}>From</th>
                                    <th className={"col-3 text-center"}>Amount</th>
                                    <th className={"col-3 text-center"}>Lock Amount</th>
                                    <th className={"col-3 text-center"}>Withdraw</th>
                                </tr>
                                </thead>
                                <tbody>
                                {body}
                                </tbody>
                            </Table>
                        </>)
                    }
                </Card.Body>
            </Card>
            <Page items={donations}
                  loading={loadingDonations}
                  reload={reload}
                  onItemsChange={(newItems) => setCurrentItems([...newItems])} />
            <div className={"mt-2 pb-5"}></div>
            <WithdrawDialog
                item={selected}
                show={modalShow}
                onHide={() => setModalShow(false)}
                onResult={() => {
                    getDonations()
                    onTransaction()
                }}/>
        </Container>
    )
}

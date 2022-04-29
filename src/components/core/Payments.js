import {Card, Container, Table} from "react-bootstrap";
import {Button, Skeleton} from "@mui/material";
import React, {useState} from "react";
import {Page} from "../pagination/Pagination";
import {DepositDialog} from "../dialogs/DepositDialog";
import {WithdrawDialog} from "../dialogs/WithdrawDialog";
import {truncateAddress} from "../Utility";
import './Card.css';

export function Payments({items, loading, refresh}) {
    const [modalShowFund, setModalShowFund] = useState(false)
    const [modalShowWithdraw, setModalShowWithdraw] = useState(false)
    const [currentItems, setCurrentItems] = useState([])
    const [selected, setSelected] = useState([])
    const placeholders = [1, 2, 3]

    let body

    if (!loading && items.length > 0) {
        body = currentItems.map((item) => (<tr key={item.id} className={"col-12"}>
            <td className={"col-3"}>
                <a href={"https://terrasco.pe/mainnet/address/" + item.beneficiary_addr}>{truncateAddress(item.beneficiary_addr)}</a>
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
    } else if (loading) {
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

    return (<Container className={"mt-4 col-sm-12 col-md-6"}>
            <h1 className="text-center mt-5 col-12">Outgoing Payments</h1>
            <Card.Title className="text-center mt-3">Here's a list of your outgoing payments.</Card.Title>
            <Card className={"custom-card mt-5"}>
                <Card.Body>
                    {!loading && items.length === 0 ? (<>
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
            <Page items={items} loading={loading} onItemsChange={(newItems) => {
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
                onResult={(item) => {
                    refresh(item)
                }}/>
            <WithdrawDialog
                item={selected}
                show={modalShowWithdraw}
                onHide={() => setModalShowWithdraw(false)}
                onResult={(result) => console.log(result)}/>
        </Container>)
}

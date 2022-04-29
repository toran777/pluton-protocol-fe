import {Card, Container, Pagination, Table} from "react-bootstrap";
import {Button, Skeleton} from "@mui/material";
import React, {useState} from "react";
import truncateAddress from "./Utility";
import useWithdraw from "./Withdraw";
import DepositDialog from "./dialogs/DepositDialog";
import './Card.css';

export function Payments({items, loading, refresh}) {
    const itemsPerPage = 10
    const offset = items.length % itemsPerPage === 0 ? 0 : 1
    const lastPage = Math.floor(items.length / itemsPerPage + offset)
    const [currentPage, setCurrentPage] = useState(1)
    const [modalShow, setModalShow] = useState(false);
    const {withdraw} = useWithdraw()
    const placeholders = [1, 2, 3]

    let currentItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    function goToFirstPage() {
        setCurrentPage(1)
    }

    function goToPreviousPage() {
        setCurrentPage(currentPage - 1)
    }

    function goToNextPage() {
        setCurrentPage(currentPage + 1)
    }

    function goToLastPage() {
        setCurrentPage(lastPage)
    }

    let body

    if (currentItems.length > 0 && !loading) {
        body = currentItems.map((item) => (<tr key={item.id} className={"col-12"}>
            <td className={"col-3"}>
                <a href={"https://terrasco.pe/mainnet/address/" + item.beneficiary_addr}>{truncateAddress(item.beneficiary_addr)}</a>
            </td>
            <td className={"col-3 text-center"}>{item.amount / 1000000 + " UST"}</td>
            <td className={"col-3 text-center"}>{item.beneficiary_amount + " UST"}</td>
            <td className={"col-3 text-center"}>
                <Button onClick={() => withdraw(item.id, "withdrawal")}
                        className={"custom-btn text-white"}>Withdraw
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
                {
                    !loading && currentItems.length === 0 ? (<>
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
                    </>)
                }
            </Card.Body>
        </Card>
        {!loading && lastPage > 1 && <Pagination className="mt-2 pb-2 custom-pagination justify-content-center">
            {currentPage > 1 && <Pagination.Prev onClick={goToPreviousPage}/>}
            {currentPage > 2 && <Pagination.Item onClick={goToFirstPage}>{1}</Pagination.Item>}
            {currentPage > 2 && <Pagination.Ellipsis/>}
            {currentPage > 1 && <Pagination.Item onClick={goToPreviousPage}>{currentPage - 1}</Pagination.Item>}
            <Pagination.Item active>{currentPage}</Pagination.Item>
            {currentPage < lastPage && <Pagination.Item onClick={goToNextPage}>{currentPage + 1}</Pagination.Item>}
            {currentPage < lastPage - 1 && <Pagination.Ellipsis/>}
            {currentPage < lastPage - 1 && <Pagination.Item onClick={goToLastPage}>{lastPage}</Pagination.Item>}
            {currentPage < lastPage - 1 && <Pagination.Next onClick={goToNextPage}/>}
        </Pagination>}
        <div className={"row mt-5 justify-content-center"}>
            <div className={"col-5"}></div>
            <Button variant={"contained"} className={"button text-white col-2"}
                    onClick={() => setModalShow(true)}>Fund</Button>
            <div className={"col-5"}></div>
        </div>
        <DepositDialog show={modalShow} onHide={() => setModalShow(false)} onResult={(item) => {
            refresh(item)
        }}/>
    </Container>)
}
import {Card, Container, Pagination, Table} from "react-bootstrap";
import {Button, Skeleton} from "@mui/material";
import React, {useState} from "react";
import truncateAddress from "./Utility";
import './Card.css';
import useWithdraw from "./Withdraw";

export function Donations({items, loading}) {
    const itemsPerPage = 10
    const offset = items.length % itemsPerPage === 0 ? 0 : 1
    const lastPage = Math.floor(items.length / itemsPerPage + offset)
    const [currentPage, setCurrentPage] = useState(1)
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
                <a href={"https://terrasco.pe/mainnet/address/" + item.depositor_addr}>{truncateAddress(item.depositor_addr)}</a>
            </td>
            <td className={"col-3 text-center"}>{item.amount / 1000000 + " UST"}</td>
            <td className={"col-3 text-center"}>{item.beneficiary_amount + " UST"}</td>
            <td className={"col-3 text-center"}>
                <Button onClick={() => withdraw(item.id, "withdraw_interest")}
                        className={"custom-btn text-white"}>Withdraw
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

    return (<Container className={"mt-4 col-sm-12 col-md-6"}>
        <h1 className="text-center mt-5 col-12">Incoming Donations</h1>
        <Card.Title className="text-center mt-3">Here's a list of your incoming donations.</Card.Title>
        <Card className={"custom-card mt-5"}>
            <Card.Body>
                {
                    !loading && currentItems.length === 0 ? (<>
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
    </Container>)
}
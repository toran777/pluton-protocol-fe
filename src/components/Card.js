import {Card, Container, Pagination, Table} from "react-bootstrap";
import './Card.css';
import PropTypes from "prop-types";
import truncateAddress from "./Utility";
import {useState} from "react";
import useWithdraw from "./Withdraw";
import Skeleton from "react-loading-skeleton";

const CustomCard = ({items, type}) => {
    const itemsPerPage = 10
    const lastPage = Math.floor(items.length / itemsPerPage + 1)
    const [currentPage, setCurrentPage] = useState(1)
    const [modalShow, setModalShow] = useState(false);
    const {withdraw} = useWithdraw()

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

    let body = "";

    if (currentItems.length > 0) {
        body = currentItems.map((item) => (<tr className={"col-12"}>
            <td className={"col-4"}>{truncateAddress(item.depositor_addr)}</td>
            <td className={"col-4 text-center"}>{item.amount / 1000000}</td>
            <td className={"col-4 text-center"}>
                <button onClick={() => withdraw(item.id)}
                        className={"custom-btn text-white"}>Claim
                </button>
            </td>
        </tr>))
    } else {
    }

    return (<Container className={"mt-4 col-6"}>
        {type === 'INCOMING' ? (<>
            <h1 className="text-center mt-5">Incoming Donations</h1>
            <Card.Title className="text-center mt-3">Here's a list of your incoming donations.</Card.Title>
            <Card className={"custom-card mt-5"}>
                <Card.Body>
                    <Table borderless={true}>
                        <thead className={"custom-header"}>
                        <tr className={"col-12"}>
                            <th className={"col-4"}>From</th>
                            <th className={"col-4 text-center"}>Amount</th>
                            <th className={"col-4 text-center"}>Claim</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentItems.map((item) => (<tr className={"col-12"}>
                            <td className={"col-4"}>{truncateAddress(item.depositor_addr)}</td>
                            <td className={"col-4 text-center"}>{item.amount / 1000000}</td>
                            <td className={"col-4 text-center"}>
                                <button onClick={() => withdraw(item.id)}
                                        className={"custom-btn text-white"}>Claim
                                </button>
                            </td>
                        </tr>))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </>) : (<>
            <h1 className="text-center mt-5">Outgoing Payments</h1>
            <Card.Title className="text-center mt-3">Here's a list of your outgoing payments.</Card.Title>
            <Card className={"custom-card mt-5"}>
                <Card.Body>
                    <Table borderless={true}>
                        <thead className={"custom-header"}>
                        <tr className={"col-12"}>
                            <th className={"col-4"}>To</th>
                            <th className={"col-4 text-center"}>Amount</th>
                            <th className={"col-4 text-center"}>Withdraw</th>
                        </tr>
                        </thead>
                        <tbody>
                        {body}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </>)}
        <Pagination className="mt-2 pb-2 custom-pagination justify-content-center">
            {currentPage > 1 && <Pagination.Prev onClick={goToPreviousPage}/>}
            {currentPage > 2 && <Pagination.Item onClick={goToFirstPage}>{1}</Pagination.Item>}
            {currentPage > 2 && <Pagination.Ellipsis/>}
            {currentPage > 1 && <Pagination.Item onClick={goToPreviousPage}>{currentPage - 1}</Pagination.Item>}
            <Pagination.Item active>{currentPage}</Pagination.Item>
            {currentPage < lastPage && <Pagination.Item onClick={goToNextPage}>{currentPage + 1}</Pagination.Item>}
            {currentPage < lastPage - 1 && <Pagination.Ellipsis/>}
            {currentPage < lastPage - 1 && <Pagination.Item onClick={goToLastPage}>{lastPage}</Pagination.Item>}
            {currentPage < lastPage - 1 && <Pagination.Next onClick={goToNextPage}/>}
        </Pagination>
        <div className={"row mt-2 justify-content-center"}>
            <div className={"col-5"}></div>
            <button className={"custom-btn text-white col-2"} onClick={() => setModalShow(true)}>Fund</button>
            <div className={"col-5"}></div>
        </div>
    </Container>)
}

Card.propTypes = {
    name: PropTypes.string, description: PropTypes.string, items: PropTypes.array
}

export default CustomCard;
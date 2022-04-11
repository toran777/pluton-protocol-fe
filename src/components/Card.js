import {Card, Container, Pagination, Table} from "react-bootstrap";
import './Card.css';
import PropTypes from "prop-types";
import truncateAddress from "./Utility";
import {useState} from "react";

const CustomCard = ({items, type}) => {
    const itemsPerPage = 10
    const lastPage = Math.floor(items.length / itemsPerPage + 1)
    const [currentPage, setCurrentPage] = useState(1)
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

    return (
        <Container className={"mt-4 col-6"}>
            {type === 'INCOMING' ? (
                    <>
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
                                    {currentItems.map((item) => (
                                        <tr className={"col-12"}>
                                            <td className={"col-4"}>{truncateAddress(item.beneficiary_addr)}</td>
                                            <td className={"col-4 text-center"}>{item.amount / 1000000}</td>
                                            <td className={"col-4 text-center"}>
                                                <button className={"custom-btn text-white"}>Claim</button>
                                            </td>
                                        </tr>))
                                    }
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </>)
                : (
                    <>
                        <h1 className="text-center mt-5">Outgoing Payments</h1>
                        <Card.Title className="text-center mt-3">Here's a list of your incoming payments.</Card.Title>
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
                                    {currentItems.length > 0 && currentItems.map((item) => (
                                        <tr className={"col-12"}>
                                            <td className={"col-4"}>{truncateAddress(item.beneficiary_addr)}</td>
                                            <td className={"col-4 text-center"}>{item.amount / 1000000}</td>
                                            <td className={"col-4 text-center"}>
                                                <button className={"custom-btn text-white"}>Withdraw</button>
                                            </td>
                                        </tr>))
                                    }
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </>)
            }
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
        </Container>
    )
}

Card.propTypes = {
    name: PropTypes.string, description: PropTypes.string, items: PropTypes.array
}

export default CustomCard;
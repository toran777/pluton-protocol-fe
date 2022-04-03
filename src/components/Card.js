import {Card, Container, Table} from "react-bootstrap";
import './Card.css';
import PropTypes from "prop-types";
import truncateAddress from "./Utility";

const CustomCard = ({items, type}) => {
    const currentItems = []

    return (
        <Container className={"mt-4 col-6"}>
            {
                type === 'INCOMING'? (
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
                                    {items.map((item) => (
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
                    </>
                ) : (
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
                                    {items.map((item) => (
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
                    </>
                )
            }
        </Container>
    )
}

Card.propTypes = {
    name: PropTypes.string, description: PropTypes.string, items: PropTypes.array
}

export default CustomCard;
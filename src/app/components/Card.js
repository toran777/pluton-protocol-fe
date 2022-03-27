import {Card, Container, Table} from "react-bootstrap";
import './Card.css';
import './Transaction';
import PropTypes from "prop-types";
import truncateAddress from "./Utility";

const CustomCard = ({name, description, items, buttonName}) => {

    return (<Container className={"mt-4 col-12"}>
        <h1>{name}</h1>
        <Card className={"custom-card mt-4"}>
            <Card.Body className={"mt-2"}>
                <Card.Title>{description}</Card.Title>
                <Table className={"mt-4"} borderless={true}>
                    <thead className={"custom-header"}>
                    <tr className={"col-12"}>
                        <th className={"col-3"}>To</th>
                        <th className={"col-3"}>Beneficiary Amount</th>
                        <th className={"col-3"}>Amount</th>
                        <th className={"col-3"}>{buttonName}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item) => (<tr className={"col-12"}>
                        <td className={"col-3"}>{truncateAddress(item.beneficiary_addr)}</td>
                        <td className={"col-3"}>{item.beneficiary_amount}</td>
                        <td className={"col-3"}>{item.amount / 1000000}</td>
                        <td className={"col-3"}>
                            <button className={"custom-btn text-white"}>{buttonName}</button>
                        </td>
                    </tr>))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    </Container>)

}

Card.propTypes = {
    name: PropTypes.string, description: PropTypes.string, items: PropTypes.array
}

export default CustomCard;
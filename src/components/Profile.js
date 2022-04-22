import Button from "@restart/ui/esm/Button";
import React, {useState} from 'react'
import {Card, Container} from "react-bootstrap";
import {useConnectedWallet, useLCDClient} from "@terra-money/wallet-provider"
import ProfileDialog from "./ProfileDialog";


export function Profile({address}) {
    
    const lcd = useLCDClient();
    const [item, setItem] = useState({name: "", github: "", linkedin: "", twitter: ""});
    const [fetchQuery, setFetchQuery] = useState(true)
    const [modalShow, setModalShow] = useState(false);

    const contractAddress = "terra1s6v2km9zd33wemr492la8tvjkll2dhnmguz64x";
    const type = "Modify";

    const get_profile = async () => {
        setFetchQuery(false)
        // Query profile info
        lcd.wasm.contractQuery(contractAddress, {
            get_profile: {
                address: address
            }}).then((r) => {
                setItem(prevItem => ({...prevItem, img: r.img, name: r.name, description: r.description, github: r.github, linkedin: r.linkedin, twitter: r.twitte}))
            }).catch((error) => console.log(error));
    }

    fetchQuery && get_profile()

    return(
        <Container className={"mt-4 col-4"}>
            <Card className={"custom-card mt-5"}>
                <Card.Title className="text-center mt-3">{item.name}</Card.Title>
                <Card.Body>
                        <Card.Img src={"0x7183.png"} alt="profile"/>
                        <Card.Text></Card.Text>
                        <Card.Text>{item.description}</Card.Text>
                        <Card.Link href = {item.github} >Github</Card.Link>
                        <Card.Link href = {item.linkedin}>Linkedin</Card.Link>
                        <Card.Link href = {item.twitter}>Twitter</Card.Link>
                </Card.Body>
                <Button variant = "contained" onClick={() => setModalShow(true)}>{type}</Button>
                <ProfileDialog show={modalShow} onHide={() => setModalShow(false)}/>
    
            </Card>
        </Container>
    )
}
export default Profile;
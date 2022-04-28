import React, {useState} from 'react'
import {Card, Container} from "react-bootstrap";
import {useConnectedWallet, useLCDClient} from "@terra-money/wallet-provider"
import ProfileDialog from "./dialogs/ProfileDialog";
import {Skeleton} from "@mui/material";
import {useParams} from 'react-router-dom'

export function Profile() {
    const { address } = useParams();

    const lcd = useLCDClient({
        URL: 'https://bombay-lcd.terra.dev',
        chainID: 'bombay-12',
    });
    const [profile, setProfile] = useState();
    const [fetchQuery, setFetchQuery] = useState(true)
    const [modalShow, setModalShow] = useState(false);

    const contractAddress = "terra1s6v2km9zd33wemr492la8tvjkll2dhnmguz64x";
    const type = (useConnectedWallet().walletAddress === address) ? "Modify" : "Donate";

    const get_profile = async () => {
        setFetchQuery(false)
        // Query profile info
        lcd.wasm.contractQuery(contractAddress, {
            get_profile: {
                address: address
            }
        }).then((r) => {
            setProfile(prevItem => ({
                ...prevItem,
                img: r.img,
                name: r.name,
                description: r.description,
                github: r.github,
                linkedin: r.linkedin,
                twitter: r.twitter
            }))
        }).catch((error) => console.log(error));
    }

    fetchQuery && get_profile()

    return (
        <Container className={"mt-4 col-4"}>
            <Card className={"custom-card mt-5"}>
                <Card.Title className="text-center mt-3">
                    {profile ? profile.name : <Skeleton/>}
                </Card.Title>
                <Card.Body>
                    <Card.Img src={"../0x7183.png"} alt="profile"/>
                    <Card.Text></Card.Text>
                    <Card.Subtitle>{profile ? profile.description : <Skeleton/>}</Card.Subtitle>
                    <Card.Text></Card.Text>
                    <Card.Link href={profile ? profile.github : <Skeleton/>}>Github</Card.Link>
                    <Card.Link href={profile ? profile.linkedin : <Skeleton/>}>Linkedin</Card.Link>
                    <Card.Link href={profile ? profile.twitter : <Skeleton/>}>Twitter</Card.Link>
                </Card.Body>
                <button variant="contained" onClick={() => setModalShow(true)}>{type}</button>
                <ProfileDialog show={modalShow} onHide={() => setModalShow(false)}/>

            </Card>
        </Container>
    )
}

export default Profile;
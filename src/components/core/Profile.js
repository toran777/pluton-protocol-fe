import React, {useEffect, useState} from 'react'
import {Card, Container} from "react-bootstrap";
import {useConnectedWallet, useLCDClient} from "@terra-money/wallet-provider"
import {Button, Skeleton} from "@mui/material";
import {useParams} from 'react-router-dom';
import {profileAddress} from "../Utility";
import {ProfileDialog} from "../dialogs/ProfileDialog";
import {DepositDialog} from "../dialogs/DepositDialog";

export function Profile() {
    const {address} = useParams()
    const connectedWallet = useConnectedWallet()
    const lcd = useLCDClient()

    const [fetchQuery, setFetchQuery] = useState(true)
    const [modalShow, setModalShow] = useState(false)
    const [type, setType] = useState('')
    const [content, setContent] = useState(
        <Card className={"custom-card mt-5"}>
            <Card.Body className={"text-center"}>
                <Card.Title><Skeleton/></Card.Title>
                <Card.Img src={'../0x7183.png'}/>
                <Card.Text></Card.Text>
                <Card.Subtitle><Skeleton/></Card.Subtitle>
                <Card.Text></Card.Text>
                <Skeleton/>
            </Card.Body>
        </Card>
    )

    useEffect(() => {
        if (connectedWallet) {
            const getProfile = async () => {
                setFetchQuery(false)
                const buttonType = connectedWallet.walletAddress === address ? "Modify" : "Donate"
                setType(buttonType)
                // Query profile info
                lcd.wasm.contractQuery(profileAddress, {
                    get_profile: {
                        address: address
                    }
                }).then((r) => {
                    const cardContent = <div>
                        <Card className={"custom-card mt-5"}>
                            <Card.Body className={"text-center"}>
                                <Card.Title>{r.name}</Card.Title>
                                <Card.Img src={'../0x7183.png'}/>
                                <Card.Text></Card.Text>
                                <Card.Subtitle>{r.description}</Card.Subtitle>
                                <Card.Text></Card.Text>
                                <Card.Link href={r.github} target={"_blank"}>Github</Card.Link>
                                <Card.Link href={r.linkedin} target={"_blank"}>LinkedIn</Card.Link>
                                <Card.Link href={r.twitter} target={"_blank"}>Twitter</Card.Link>
                            </Card.Body>
                        </Card>
                        <div className={"row mt-3 justify-content-center"}>
                            <div className={"col-5"}></div>
                            <Button variant={"contained"}
                                    className={"custom-btn text-white col-2"}
                                    onClick={() => setModalShow(true)}>{buttonType}</Button>
                            <div className={"col-5"}></div>
                        </div>
                    </div>
                    setContent(cardContent)
                }).catch((_) => {
                    const cardContent = <Card className={"custom-card mt-5"}>
                        <Card.Body className={"text-center"}>
                            <Button variant={"contained"}
                                    className={"custom-btn text-white col-2"}
                                    onClick={() => setModalShow(true)}>Create</Button>
                        </Card.Body>
                    </Card>
                    setContent(cardContent)
                });
            }

            fetchQuery && getProfile()
        }
    })

    return (<Container className={"col-sm-12 col-md-3"}>
        {content}
        {type === 'Modify' ? <ProfileDialog show={modalShow} onHide={() => {
            setModalShow(false)
        }}/> : <DepositDialog
            show={modalShow}
            onHide={() => {setModalShow(false)}}
            onResult={(res) => console.log(res)}/>}
    </Container>)
}

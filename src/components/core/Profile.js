import React, {useEffect, useState} from 'react'
import {Card, Container} from "react-bootstrap";
import {useConnectedWallet, useLCDClient} from "@terra-money/wallet-provider"
import {Button, Skeleton} from "@mui/material";
import {useParams} from 'react-router-dom';
import {profileAddress} from "../Utility";
import {ProfileDialog} from "../dialogs/ProfileDialog";
import {DepositDialog} from "../dialogs/DepositDialog";
import JSZip from "jszip";

export function Profile() {
    const {address} = useParams()
    const connectedWallet = useConnectedWallet()
    const lcd = useLCDClient()

    const [profile, setProfile] = useState({img: '', name: '', description: '', github: '', linkedin: '', twitter: ''})
    const [fetchQuery, setFetchQuery] = useState(true)
    const [modalShow, setModalShow] = useState(false)
    const [type, setType] = useState('')
    const [content, setContent] = useState(<Card className={"custom-card mt-5"}>
        <Card.Body className={"text-center"}>
            <Card.Title><Skeleton/></Card.Title>
            <Skeleton />
            <Card.Text></Card.Text>
            <Card.Subtitle><Skeleton/></Card.Subtitle>
            <Card.Text></Card.Text>
            <Skeleton/>
        </Card.Body>
    </Card>)

    function unzip(zipFile) {
        JSZip.loadAsync(zipFile, {base64: true})
            .then(({files}) => {
                const mediaFiles = Object.entries(files)
                mediaFiles.forEach(([, image]) => {
                    image.async('blob').then(blob => {
                        document.querySelector("#image").src = URL.createObjectURL(blob);
                    })
                })
            })
    }

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
                    unzip(r.img)
                    setProfile(r)
                    const cardContent = <div>
                        <Card className={"custom-card mt-5"}>
                            <Card.Body className={"text-center"}>
                                <Card.Title>{r.name}</Card.Title>
                                <Card.Img id={"image"} />
                                <Card.Text></Card.Text>
                                <Card.Subtitle>{r.description}</Card.Subtitle>
                                <Card.Text></Card.Text>
                                <Card.Link href={r.github} target={"_blank"}>Github</Card.Link>
                                <Card.Link href={r.linkedin} target={"_blank"}>LinkedIn</Card.Link>
                                <Card.Link href={r.twitter} target={"_blank"}>Twitter</Card.Link>
                            </Card.Body>
                        </Card>
                        <div className={"row mt-3 justify-content-center"}>
                            <Button variant={"contained"}
                                    className={"custom-btn text-white col-2"}
                                    onClick={() => setModalShow(true)}>{buttonType}</Button>
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

    return (<Container className={"col-sm-12 col-md-6 col-lg-4 col-xl-3 pb-3"}>
        {content}
        {type === 'Modify' ? <ProfileDialog
            show={modalShow}
            profile={profile}
            onHide={() => {
                setModalShow(false)
            }}/> : <DepositDialog
            show={modalShow}
            address={address}
            onHide={() => {
                setModalShow(false)
            }}
            onResult={(res) => console.log(res)}/>}
    </Container>)
}

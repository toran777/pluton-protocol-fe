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

    let content

    const [profile, setProfile] = useState({img: '', name: '', description: '', github: '', linkedin: '', twitter: ''})
    const [loading, setLoading] = useState(true)
    const [fetchQuery, setFetchQuery] = useState(true)
    const [modalShow, setModalShow] = useState(false)
    const [type, setType] = useState('')

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

    function equals(req) {
        return req.img === profile.img &&
            req.name === profile.name &&
            req.description === profile.description &&
            req.github === profile.github &&
            req.linkedin === profile.linkedin &&
            req.twitter === profile.twitter
    }

    function getProfile() {
        // Query profile info
        setLoading(true)
        let tries = 0

        const loop = () => {
            lcd.wasm.contractQuery(profileAddress, {
                get_profile: {
                    address: address
                }
            }).then((r) => {
                if (equals(r) && tries < 5) {
                    tries += 1
                    setTimeout(loop, 2000)
                } else {
                    if (r.img) unzip(r.img)
                    if (!r.name) r.name = ' '
                    setProfile(r)
                    setLoading(false)
                }
            }).catch((_) => {
                if (tries < 5) {
                    tries += 1
                    setTimeout(loop, 2000)
                } else setLoading(false)
            });
        }

        loop()
    }

    useEffect(() => {
        if (connectedWallet) {
            const query = async () => {
                setFetchQuery(false)
                const buttonType = connectedWallet.walletAddress === address ? "Modify" : "Donate"
                setType(buttonType)
                getProfile()
            }

            fetchQuery && query()
        }
    })

    if (loading)
        content =
            <Card className={"custom-card mt-5"}>
                <Card.Body className={"text-center"}>
                    <Card.Title><Skeleton/></Card.Title>
                    <Skeleton />
                    <Card.Text></Card.Text>
                    <Card.Subtitle><Skeleton/></Card.Subtitle>
                    <Card.Text></Card.Text>
                    <Skeleton/>
                </Card.Body>
            </Card>
    else if (!loading && profile.name)
        content =
            <div>
                <Card className={"custom-card mt-5"}>
                    <Card.Body className={"text-center"}>
                        <Card.Title>{profile.name}</Card.Title>
                        <Card.Img id={"image"} />
                        <Card.Text></Card.Text>
                        <Card.Subtitle>{profile.description}</Card.Subtitle>
                        <Card.Text></Card.Text>
                        <Card.Link href={profile.github} target={"_blank"}>Github</Card.Link>
                        <Card.Link href={profile.linkedin} target={"_blank"}>LinkedIn</Card.Link>
                        <Card.Link href={profile.twitter} target={"_blank"}>Twitter</Card.Link>
                    </Card.Body>
                </Card>
                <div className={"row mt-3 justify-content-center"}>
                    <Button variant={"contained"}
                            className={"custom-btn text-white col-2"}
                            onClick={() => setModalShow(true)}>{connectedWallet.walletAddress === address ? "Modify" : "Donate"}
                    </Button>
                </div>
            </div>
    else if (!loading && !profile.name) {
        content =
            <Card className={"custom-card mt-5"}>
                <Card.Body className={"text-center"}>
                    <Button variant={"contained"}
                            className={"custom-btn text-white col-2"}
                            onClick={() => setModalShow(true)}>Create</Button>
                </Card.Body>
            </Card>
    }

    return (<Container className={"col-sm-12 col-md-6 col-lg-4 col-xl-3 pb-3"}>
        {content}
        {type === 'Modify' ? <ProfileDialog
            show={modalShow}
            profile={profile}
            onDone={() => {
                setProfile({...profile})
            }}
            onHide={() => {
                setModalShow(false)
            }}/> : <DepositDialog
            show={modalShow}
            address={address}
            onHide={() => {
                setModalShow(false)
            }}/>}
    </Container>)
}

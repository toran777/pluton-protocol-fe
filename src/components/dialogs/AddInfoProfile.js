import {Form, Modal} from "react-bootstrap";
import {Button} from "@material-ui/core";
import {useEffect, useState} from "react";

export function AddInfoProfile({show, onHide, onSubmit, oldProfile}) {
    const [profile, setProfile] = useState({img: '', name: '', description: '', github: '', linkedin: '', twitter: ''})
    const [done, setDone] = useState(false)

    useEffect(() => {
        const setOldProfile = async() => {
            if (oldProfile.name) {
                setDone(true)
                setProfile(oldProfile)
            }
        }
        !done && setOldProfile()
    })

    function onTextChange(event, key) {
        const message = profile
        message[key] = event.target.value
        setProfile({...message})
    }

    function onFileSelected(event) {
        const file = event.target.files[0]
        const zip = require('jszip')()
        zip.file(file.name, file)
        zip.generateAsync({type: "array"}).then((result) => {
            const encodedImage = Buffer.from(result).toString('base64')
            const message = profile
            message['img'] = encodedImage
            console.log(encodedImage.length)
            setProfile(message)
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control
                            onChange={(event) => onFileSelected(event)}
                            type="file" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            onChange={(event) => onTextChange(event, 'name')}
                            value={profile.name}
                            placeholder="Enter your profile name"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            onChange={(event) => onTextChange(event, 'description')}
                            value={profile.description}
                            placeholder="Enter your profile description"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Github</Form.Label>
                        <Form.Control
                            onChange={(event) => onTextChange(event, 'github')}
                            value={profile.github}
                            placeholder="Enter your github url"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Linkedin</Form.Label>
                        <Form.Control
                            onChange={(event) => onTextChange(event, 'linkedin')}
                            value={profile.linkedin}
                            placeholder="Enter your linkedin url"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Twitter</Form.Label>
                        <Form.Control
                            onChange={(event) => onTextChange(event, 'twitter')}
                            value={profile.twitter}
                            placeholder="Enter your twitter url"/>
                    </Form.Group>
                </Form>
                <Button
                    variant={"contained"}
                    className={"col-12 p-2 mt-3 custom-btn text-white"}
                    onClick={() => {onSubmit(profile)}}>Save
                </Button>
            </Modal.Body>
        </Modal>
    )
}
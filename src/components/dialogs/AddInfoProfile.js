import {Form, Modal} from "react-bootstrap";
import {Button} from "@material-ui/core";
import {useState} from "react";

export function AddInfoProfile({show, onHide, onSubmit}) {
    const [profile, setProfile] = useState({img: "", name: "", description: "", github: "", linkedin: "", twitter: ""})

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
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            onChange={(event) => setProfile(prevProfile => ({
                                ...prevProfile, name: event.target.value
                            }))} placeholder="Enter your profile name"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Description</Form.Label>
                        <Form.Control onChange={(event) => setProfile(prevProfile => ({
                            ...prevProfile, description: event.target.value
                        }))} placeholder="Enter your profile description"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Github</Form.Label>
                        <Form.Control onChange={(event) => setProfile(prevProfile => ({
                            ...prevProfile, github: event.target.value
                        }))} placeholder="Enter your github url"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Linkedin</Form.Label>
                        <Form.Control onChange={(event) => setProfile(prevProfile => ({
                            ...prevProfile, linkedin: event.target.value
                        }))} placeholder="Enter your linkedin url"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Twitter</Form.Label>
                        <Form.Control onChange={(event) => setProfile(prevProfile => ({
                            ...prevProfile, twitter: event.target.value
                        }))} placeholder="Enter your twitter url"/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant={"contained"}
                    className={"col-12 p-2 mt-3 custom-btn text-white"}
                    onClick={() => {onSubmit(profile)}}>Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
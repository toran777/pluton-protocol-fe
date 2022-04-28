import {Modal, Form} from "react-bootstrap";
import {Grid, Button} from "@material-ui/core";
import {useState} from "react";
import {useRegister} from "../Register";

function ProfileDialog(props) {
    const [profile, setProfile] = useState({img: "", name: "", description: "", github: "", linkedin: "", twitter: ""}) 
    const { register } = useRegister()
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control onChange={(event) => setProfile(prevProfile => ({...prevProfile, name: event.target.value}))}  placeholder="Enter your profile name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Descriptionn</Form.Label>
                <Form.Control onChange={(event) => setProfile(prevProfile => ({...prevProfile, amount: event.target.value}))} placeholder="Enter your profile description" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Github</Form.Label>
                <Form.Control onChange={(event) => setProfile(prevProfile => ({...prevProfile, lockAmount: event.target.value}))} placeholder="Enter your github url" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Linkedin</Form.Label>
                <Form.Control onChange={(event) => setProfile(prevProfile => ({...prevProfile, lockAmount: event.target.value}))} placeholder="Enter your linkedin url" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Twitter</Form.Label>
                <Form.Control onChange={(event) => setProfile(prevProfile => ({...prevProfile, lockAmount: event.target.value}))} placeholder="Enter your twitter url" />
            </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Grid container justify="center">
            <Button variant = "contained" onClick={() => register(profile)}>Save</Button>
        </Grid>
      </Modal.Footer>
    </Modal>
  );
}


export default ProfileDialog;
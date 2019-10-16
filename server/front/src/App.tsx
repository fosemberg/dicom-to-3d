import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";

const App: React.FC = () => (
  <Container className="p-3">
    <Jumbotron>
      <h1 className="header">Fosemberg CI</h1>
    </Jumbotron>

    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>hash commit</Form.Label>
        <Form.Control type="text" placeholder="hash commit"/>
      </Form.Group>

      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>command</Form.Label>
        <Form.Control as="textarea" rows="3"/>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  </Container>
);

export default App;
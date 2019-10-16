import * as React from 'react';
import {Button, Form} from "react-bootstrap";

const MainPage: React.FC = () => (
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
);

export default MainPage;
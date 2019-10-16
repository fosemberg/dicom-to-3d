import * as React from 'react';
import {Button, Card, Form} from "react-bootstrap";

const BuildForm = () => {
  return (
    <Card className="BuildForm">
      <Card.Body>This is some text within a card body.
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
            Run build
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BuildForm;
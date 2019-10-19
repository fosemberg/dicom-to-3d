import * as React from 'react';
import {Button, Card, Form} from "react-bootstrap";
import {useState} from "react";
import {CommitHash} from "../../utils/apiTypes";
import {sendBuild} from "../../store/getData";

interface IBuildFormProps {
  sendData?: (commitHash: CommitHash, command: string) => Promise<string>;
}

const BuildForm: React.FC<IBuildFormProps> = (
  {
    sendData = sendBuild
  }
) => {
  const [commitHash, setCommitHash] = useState<CommitHash>('');
  const onChangeCommitHash = (e: React.FormEvent<HTMLInputElement>) => setCommitHash(e.currentTarget.value);

  const [command, setCommand] = useState<string>('');
  const onChangeCommand = (e: React.FormEvent<HTMLInputElement>) => setCommand(e.currentTarget.value);

  const clearData = () => {
    setCommitHash('');
    setCommand('');
  };

  const onClickSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sendData(commitHash, command);
    clearData();
  };

  return (
    <Card className="BuildForm">
      <Card.Body>This is some text within a card body.
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>commit hash</Form.Label>
            <Form.Control
              value={commitHash}
              onChange={onChangeCommitHash}
              type="text"
              placeholder="hash commit"
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>command</Form.Label>
            <Form.Control
              value={command}
              onChange={onChangeCommand}
              as="textarea"
              rows="3"
            />
          </Form.Group>

          <Button
            onClick={onClickSubmit}
            variant="primary"
            type="submit"
          >
            Run build
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BuildForm;
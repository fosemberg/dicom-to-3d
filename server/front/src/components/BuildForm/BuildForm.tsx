import * as React from 'react';
import {Button, Card, Form} from "react-bootstrap";
import {useState} from "react";
import {CommitHash, RepositoryUrl} from "../../utils/apiTypes";
import {sendBuild} from "../../store/store";

interface IBuildFormProps {
  sendData?: (repositoryUrl: RepositoryUrl, commitHash: CommitHash, command: string) => Promise<string>;
}

const BuildForm: React.FC<IBuildFormProps> = (
  {
    sendData = sendBuild
  }
) => {
  const [repositoryUrl, setRepositoryUrl] = useState<RepositoryUrl>('');
  const onChangeRepositoryUrl = (e: React.FormEvent<HTMLInputElement>) => setRepositoryUrl(e.currentTarget.value);

  const [commitHash, setCommitHash] = useState<CommitHash>('');
  const onChangeCommitHash = (e: React.FormEvent<HTMLInputElement>) => setCommitHash(e.currentTarget.value);

  const [command, setCommand] = useState<string>('');
  const onChangeCommand = (e: React.FormEvent<HTMLInputElement>) => setCommand(e.currentTarget.value);

  const clearData = () => {
    setRepositoryUrl('');
    setCommitHash('');
    setCommand('');
  };

  const onClickSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sendData(repositoryUrl, commitHash, command);
    clearData();
  };

  return (
    <Card className="BuildForm">
      <Card.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>repository url</Form.Label>
            <Form.Control
              value={repositoryUrl}
              onChange={onChangeRepositoryUrl}
              type="text"
              placeholder="https://github.com/fosemberg/fosemberg-ci.git"
            />
          </Form.Group>

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
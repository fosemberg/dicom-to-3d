import * as React from 'react';
import {Card, ListGroup} from "react-bootstrap";
import {MdCheck, MdClose} from "react-icons/all";
import {Status} from "../../utils/types";
import StatusIcon from "../StatusIcon/StatusIcon";

interface IBuildDetailsProps {
  id: number;
  commitHash: string;
  startDate: string;
  endDate: string;
  status: Status;
  output: string;
}

const BuildDetails = ({id, commitHash, startDate, endDate, status, output}: IBuildDetailsProps) => {
  return (
    <Card className="BuildDetails">
      <Card.Header>
        <StatusIcon status={status}/>
        {id}
        {' - '}
        {commitHash}
      </Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>start build: {startDate}</ListGroup.Item>
        <ListGroup.Item>end build: {endDate}</ListGroup.Item>
        <ListGroup.Item>{output}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default BuildDetails;
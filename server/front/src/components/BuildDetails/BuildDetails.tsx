import * as React from 'react';
import {Card, ListGroup} from "react-bootstrap";
import {MdAutorenew, MdCheck, MdClose} from "react-icons/all";
import {Status} from "../../utils/types";
import StatusIcon from "../StatusIcon/StatusIcon";
import {cn} from "@bem-react/classname";
import BuildDetailsHeader from "./-Header/BuildDetails-Header";

interface IBuildDetailsProps {
  id: number;
  commitHash: string;
  startDate: string;
  endDate: string;
  status: Status;
  output: string;
}

export const cnBuildDetails = cn('BuildDetails')

const BuildDetails = ({id, commitHash, startDate, endDate, status, output}: IBuildDetailsProps) => {
  return (
    <Card className={cnBuildDetails()}>
      <BuildDetailsHeader status={status} id={id} commitHash={commitHash}/>
      <ListGroup variant="flush">
        <ListGroup.Item>start build: {startDate}</ListGroup.Item>
        <ListGroup.Item>end build: {endDate}</ListGroup.Item>
        <ListGroup.Item>{output}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default BuildDetails;
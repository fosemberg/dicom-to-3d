import * as React from 'react';
import {Card, ListGroup} from "react-bootstrap";
import {IClientBuildDetailedResult, Status} from "../../utils/apiTypes";
import {cn} from "@bem-react/classname";
import BuildDetailsHeader from "./-Header/BuildDetails-Header";

export const cnBuildDetails = cn('BuildDetails');

const BuildDetails: React.FC<IClientBuildDetailedResult> = ({buildId, commitHash, status, stdOut}) => {
  const startDate = new Date();
  const endDate = new Date();
  return (
    <Card className={cnBuildDetails()}>
      <BuildDetailsHeader status={status} buildId={buildId} commitHash={commitHash}/>
      <ListGroup variant="flush">
        <ListGroup.Item>start build: {'startDate'}</ListGroup.Item>
        { status !== Status.building && <ListGroup.Item>end build: {'endDate'}</ListGroup.Item> }
        { status !== Status.building && <ListGroup.Item>{stdOut}</ListGroup.Item>}
      </ListGroup>
    </Card>
  );
};

export default BuildDetails;
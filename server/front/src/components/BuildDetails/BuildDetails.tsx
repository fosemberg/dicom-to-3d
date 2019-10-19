import * as React from 'react';
import {Card, ListGroup} from "react-bootstrap";
import {IClientBuildDetailedResult, Status} from "../../utils/apiTypes";
import {cn} from "@bem-react/classname";
import BuildDetailsHeader from "./-Header/BuildDetails-Header";
import moment from 'moment';

const dateFormat = 'DD MMM YYYY hh:mm a';
export const cnBuildDetails = cn('BuildDetails');

const BuildDetails: React.FC<IClientBuildDetailedResult> = (
  {
    buildId,
    commitHash,
    command,
    status,
    stdOut,
    startDate,
    endDate
  }
) => {
  return (
    <Card className={cnBuildDetails()}>
      <BuildDetailsHeader status={status} buildId={buildId} commitHash={commitHash}/>
      <ListGroup variant="flush">
        <ListGroup.Item>command: {command}</ListGroup.Item>
        <ListGroup.Item>start build: {moment(startDate).format(dateFormat)}</ListGroup.Item>
        {status !== Status.building && <ListGroup.Item>end build: {moment(endDate).format(dateFormat)}</ListGroup.Item>}
        {status !== Status.building && <ListGroup.Item>std out: {stdOut}</ListGroup.Item>}
      </ListGroup>
    </Card>
  );
};

export default BuildDetails;
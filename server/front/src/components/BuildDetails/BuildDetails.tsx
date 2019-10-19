import * as React from 'react';
import {Card, ListGroup} from "react-bootstrap";
import {IClientBuildDetailedResult, Status} from "../../utils/apiTypes";
import {cn} from "@bem-react/classname";
import BuildDetailsHeader from "./-Header/BuildDetails-Header";
import moment from 'moment';

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
        <ListGroup.Item>{command}</ListGroup.Item>
        <ListGroup.Item>start build: {moment(startDate).format("DD MMM YYYY hh:mm a")}</ListGroup.Item>
        {status !== Status.building && <ListGroup.Item>end build: {moment(endDate).format("DD MMM YYYY hh:mm a")}</ListGroup.Item>}
        {status !== Status.building && <ListGroup.Item>{stdOut}</ListGroup.Item>}
      </ListGroup>
    </Card>
  );
};

export default BuildDetails;
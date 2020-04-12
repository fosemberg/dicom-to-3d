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
    repositoryUrl,
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
        <ListGroup.Item>url: {repositoryUrl}</ListGroup.Item>
        <ListGroup.Item>command: {command}</ListGroup.Item>
        <ListGroup.Item>start build: {moment(startDate).format(dateFormat)}</ListGroup.Item>
        {status !== Status.building && <ListGroup.Item>end build: {moment(endDate).format(dateFormat)}</ListGroup.Item>}
        {
          status !== Status.building && <ListGroup.Item>
            std out: <br/>
            <pre>{stdOut}</pre>
          </ListGroup.Item>
        }
      </ListGroup>
    </Card>
  );
};

export default BuildDetails;
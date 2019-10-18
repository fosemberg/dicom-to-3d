import * as React from 'react';
import './BuildDetails-Header.scss';
import StatusIcon from "../../StatusIcon/StatusIcon";
import {Card} from "react-bootstrap";
import {BuildId, Status} from "../../../utils/apiTypes";
import {cn} from "@bem-react/classname";

interface IBuildDetailsHeaderProps {
  status: Status;
  buildId: BuildId;
  commitHash: string;
}

const cnBuildDetailsHeader = cn('BuildDetails-Header');

const BuildDetailsHeader = ({status, buildId, commitHash}: IBuildDetailsHeaderProps) => {
  return (
    <Card.Header className={cnBuildDetailsHeader({
      building: status === Status.building,
      success: status === Status.success,
      fail: status === Status.fail,
    })}>
      <StatusIcon status={status}/>
      {buildId}
      {' - '}
      {commitHash}
    </Card.Header>
  );
};

export default BuildDetailsHeader;
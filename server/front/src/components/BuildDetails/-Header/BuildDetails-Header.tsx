import * as React from 'react';
import './BuildDetails-Header.scss';
import StatusIcon from "../../StatusIcon/StatusIcon";
import {Card} from "react-bootstrap";
import {Status} from "../../../utils/apiTypes";
import {cn} from "@bem-react/classname";

interface IBuildDetailsHeaderProps {
  status: Status;
  id: number;
  commitHash: string;
}

const cnBuildDetailsHeader = cn('BuildDetails-Header');

const BuildDetailsHeader = ({status, id, commitHash}: IBuildDetailsHeaderProps) => {
  return (
    <Card.Header className={cnBuildDetailsHeader({
      building: status === Status.building,
      success: status === Status.success,
      fail: status === Status.fail,
    })}>
      <StatusIcon status={status}/>
      {id}
      {' - '}
      {commitHash}
    </Card.Header>
  );
};

export default BuildDetailsHeader;
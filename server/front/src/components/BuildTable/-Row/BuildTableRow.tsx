import * as React from 'react';
import './BuildTableRow.scss';
import {cn} from '@bem-react/classname'
import {useHistory} from 'react-router';
import {IClientBuildResult, Status} from "../../../utils/apiTypes";
import StatusIcon from "../../StatusIcon/StatusIcon";

type IBuildTableRowProps = IClientBuildResult;

export const cnBuildTableRow = cn('BuildTable-Row');

const BuildTableRow: React.FC<IBuildTableRowProps> = (
  {
    buildId,
    status,
    repositoryOwner,
    repositoryName,
    commitHash,
  }
) => {
  const {push} = useHistory();
  return (
    <tr
      onClick={() => push(`build/${buildId}`)}
      className={cnBuildTableRow({
        success: status === Status.success,
        fail: status === Status.fail,
        building: status === Status.building,
      })}
    >
      <td>{buildId}</td>
      <td><StatusIcon status={status}/></td>
      <td>{repositoryOwner}</td>
      <td>{repositoryName}</td>
      <td>{commitHash}</td>
    </tr>
  )
};

export default BuildTableRow;
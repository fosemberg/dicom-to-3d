import * as React from 'react';
import './BuildTableRow.scss';
import {cn} from '@bem-react/classname'
import {useHistory} from 'react-router';
import {Status} from "../../../utils/types";
import StatusIcon from "../../StatusIcon/StatusIcon";

interface IBuildTableRowProps {
  id: number;
  status: Status;
  commitHash: string
}

export const cnBuildTableRow = cn('BuildTable-Row');

const BuildTableRow: React.FC<IBuildTableRowProps> = ({id, status, commitHash}) => {
  const {push} = useHistory();
  return (
    <tr onClick={() => push(`build/${id}/${commitHash}`)} className={cnBuildTableRow({
      success: status === Status.success,
      fail: status === Status.fail,
      building: status === Status.building,
    })}>
      <td>
        {id}
      </td>
      <td>
        <StatusIcon status={status}/>
      </td>
      <td>{commitHash}</td>
    </tr>
  )
};

export default BuildTableRow;
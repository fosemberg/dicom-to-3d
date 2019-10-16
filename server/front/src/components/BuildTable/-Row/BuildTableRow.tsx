import * as React from 'react';
import {MdCheck, MdClose} from "react-icons/all";
import './BuildTableRow.scss';
import {cn} from '@bem-react/classname'
import {useHistory} from 'react-router';

interface IBuildTableRowProps {
  id: number;
  isSuccess: boolean;
  commitHash: string
}

export const cnBuildTableRow = cn('BuildTable-Row')

const BuildTableRow: React.FC<IBuildTableRowProps> = ({id, isSuccess, commitHash}) => {
  const {push} = useHistory();
  return (
    <tr onClick={() => push(`build/${id}`)} className={cnBuildTableRow({isSuccess})}>
      <td>
        {id}
      </td>
      <td>
        {isSuccess ? <MdCheck/> : <MdClose/>}
      </td>
      <td>{commitHash}</td>
    </tr>
  )
};

export default BuildTableRow;
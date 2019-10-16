import * as React from 'react';
import {MdCheck, MdClose} from "react-icons/all";
import './BuildTableRow.scss';
import { cn } from '@bem-react/classname'

interface IBuildTableRowProps {
  isSuccess: boolean;
  commitHash: string
}

export const cnBuildTableRow = cn('BuildTable-Row')

const BuildTableRow: React.FC<IBuildTableRowProps> = ({isSuccess, commitHash}) => (
  <tr className={cnBuildTableRow({isSuccess})}>
    <td>
      {isSuccess ? <MdCheck/> : <MdClose/>}
    </td>
    <td>{commitHash}</td>
  </tr>
);

export default BuildTableRow;
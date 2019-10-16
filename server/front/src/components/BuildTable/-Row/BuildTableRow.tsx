import * as React from 'react';
import {MdCheck, MdClose} from "react-icons/all";

interface IBuildTableRowProps {
  isOk: boolean;
  commitHash: string
}

const BuildTableRow: React.FC<IBuildTableRowProps> = ({isOk, commitHash}) => (
  <tr>
    <td>
      {isOk ? <MdCheck/> : <MdClose/>}
    </td>
    <td>{commitHash}</td>
  </tr>
);

export default BuildTableRow;
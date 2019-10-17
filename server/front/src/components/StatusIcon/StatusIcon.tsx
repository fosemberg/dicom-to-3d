import React from 'react';
import {Status} from "../../utils/types";
import {MdCheck, MdClose} from "react-icons/all";
import {cn} from "@bem-react/classname";

interface IStatusIconProps {
  status: Status;
}

const cnStatusIcon = cn('StatusIcon');

const StatusIcon = ({status}: IStatusIconProps) => (
  <span className={cnStatusIcon()}>
    {status === Status.building ? <div>b</div> :
      status === Status.success ? <MdCheck/> :
        status === Status.fail ? <MdClose/> :
          <div/>}
  </span>
);

export default StatusIcon;
import React from 'react';
import {Status} from "../../utils/apiTypes";
import {MdCheck, MdClose, MdAutorenew} from "react-icons/all";
import {cn} from "@bem-react/classname";
import './StatusIcon.scss';

interface IStatusIconProps {
  status: Status;
}

const cnStatusIcon = cn('StatusIcon');

const StatusIcon = ({status}: IStatusIconProps) => (
  <span className={cnStatusIcon()}>
    {status === Status.building ? <MdAutorenew className={cnStatusIcon({'MdAutorenew': true}) }/> :
      status === Status.success ? <MdCheck/> :
        status === Status.fail ? <MdClose/> :
          <div/>}
  </span>
);

export default StatusIcon;
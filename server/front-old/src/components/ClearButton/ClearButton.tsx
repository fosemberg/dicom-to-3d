import React from 'react';
import {cn} from "@bem-react/classname";

import './ClearButton.css';

interface ClearButtonProps {
  onClick?: () => void;
  className?: string;
  isShow?: boolean;
}

const cnClearButton = cn('ClearButton');

const ClearButton: React.FC<ClearButtonProps> = (
  {
    onClick = () => {},
    className = '',
    isShow= true,
  }
) => {
  return (
    <button
      type="button"
      className={`close ${cnClearButton({hide: !isShow})} ${className}`}
      {...{onClick}}
    >
      <span aria-hidden="true">×</span>
    </button>
  );
};

export default ClearButton;

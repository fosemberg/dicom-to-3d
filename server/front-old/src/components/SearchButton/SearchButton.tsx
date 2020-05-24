import React from 'react';
import {Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import {cn} from "@bem-react/classname";

import './SearchButton.css';

interface SearchButtonProps {
  isComponentName: boolean;
  isKeywords: boolean;
  onClick?: (e: React.FormEvent<HTMLButtonElement>) => void;
  className?: string;
}

const cnSearchButton = cn('SearchButton');

const SearchButton: React.FC<SearchButtonProps> = (
  {
    isComponentName,
    isKeywords,
    onClick = () => {
    },
    className = '',
  }
) => {
  const label = 'Search';
  const disabled = !isComponentName || !isKeywords;

  return (
    disabled
      ? <OverlayTrigger
        placement='bottom'
        overlay={
          <Tooltip id='Switch-tooltip'>
            {'Please enter a '}
            {
              !isComponentName && !isKeywords
                ? 'component name and query'
                : !isComponentName
                  ? 'component  name'
                  : 'query'
            }
            {' to start the search'}
          </Tooltip>
        }
      >
        <Button
          variant="primary"
          type="button"
          className={cnSearchButton(
            {
              disabled: true
            },
            [className]
          )}
        >
          {label}
        </Button>
      </OverlayTrigger>
      : <Button
        variant="primary"
        type="button"
        {...{onClick,}}
        className={cnSearchButton(null, [className])}
      >
        {label}
      </Button>
  );
};

export default SearchButton;

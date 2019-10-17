import { cn } from '@bem-react/classname';
import React from 'react';
import { ITheme } from './index';
import './Theme.scss';

export const cnTheme = cn('Theme');

const Theme: React.FC<ITheme> = ({ className, children }) => (
  <div className={cnTheme({}, [className])}>{children}</div>
);

export default Theme;

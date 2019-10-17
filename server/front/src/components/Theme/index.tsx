import {cn} from "@bem-react/classname";
import {IClassNameProps} from "@bem-react/core";

export interface ITheme extends IClassNameProps {
  color?: 'project-default';
  space?: 'default';
}

export const cnTheme = cn('Theme');


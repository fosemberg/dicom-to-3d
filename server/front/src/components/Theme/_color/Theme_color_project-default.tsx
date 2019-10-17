import { withBemMod } from '@bem-react/core';
import { ITheme } from '../index';
import './Theme_color_project-default.scss';

export const ThemeColorProjectDefault = withBemMod<ITheme>('Theme', {
  color: 'project-default',
});

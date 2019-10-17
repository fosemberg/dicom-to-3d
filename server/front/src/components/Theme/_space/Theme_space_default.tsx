import { withBemMod } from '@bem-react/core';
import { ITheme } from '../index';
import './Theme_space_default.scss';

export const ThemeSpaceDefault = withBemMod<ITheme>('Theme', {
  space: 'default',
});

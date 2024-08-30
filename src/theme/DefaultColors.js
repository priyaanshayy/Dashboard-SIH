import { createTheme } from '@mui/material/styles';
import typography from './Typography';
import { shadows } from './Shadows';

const createBaselightTheme = (colors) => createTheme({
    direction: 'ltr',
    palette: {
        primary: {
            main: colors.primary,
            light: colors.primaryLight || colors.primary,
            dark: colors.primaryDark || colors.primary,
        },
        secondary: {
            main: colors.secondary,
            light: colors.secondaryLight || colors.secondary,
            dark: colors.secondaryDark || colors.secondary,
        },
        
    },
    typography,
    shadows,
});

export default createBaselightTheme;

import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#64b5f6',
    },
    secondary: {
      main: '#ff8a65',
    },
    background: {
      default: '#1c1c1c',
      paper: '#424242',
    },
    text: {
      primary: '#ffffff',
      secondary: '#bdbdbd',
    },
  },
});

export default darkTheme
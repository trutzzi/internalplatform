import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: red[500]
    },
    secondary: {
      main: '#000000'
    }
  }
});

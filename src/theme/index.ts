import { createTheme } from '@mui/material/styles';
import { red, yellow } from '@mui/material/colors';
import { textTransform } from '@mui/system';


export const theme = createTheme({
  palette: {
    primary: {
      main: red[500],

    },
    secondary: {
      main: yellow[500],
    },
  },
});

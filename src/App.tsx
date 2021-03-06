import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './theme';
import NavigatorComponent from './components/navigator';
import ErrorHandler from './ErrorBoundary';
import RoutesComp from './routes/routes';
import { SnackBarProvider } from './components/snackbarProvider';

function App() {
  return (
    <ErrorHandler>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <NavigatorComponent />
          <SnackBarProvider>
            <RoutesComp />
          </SnackBarProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorHandler>
  );
}

export default App;

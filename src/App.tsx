import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import Navigator from './components/Navigator';
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from './ErrorBoundary';
import RoutesComp from './routes/routes'
import { SnackBarProvider } from './components/SnackbarProvider';

function App() {

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navigator />
          <SnackBarProvider>
            <RoutesComp />
          </SnackBarProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

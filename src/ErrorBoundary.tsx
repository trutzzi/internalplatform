import { Grid } from '@mui/material';
import React, { ErrorInfo } from 'react';

type MyProps = {
  children: React.ReactNode
};
type MyState = {
  error: any;
  errorInfo: ErrorInfo | null;
  eventId: number | null;
};

export class ErrorBoundary extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = { error: null, errorInfo: null, eventId: null };
  }

  componentDidCatch(error: any, errorInfo: ErrorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo,
    });

    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <Grid container padding={5} direction="column">
          <Grid item>
            <h2>Something went wrong.</h2>
            <p>
              This is not your fault!
              <br />
              Write an email to
              {' '}
              <a href="mailto: trutzzi@yahoo.ro">trutzzi@yahoo.ro</a>
              {' '}
              and hope for the best.
            </p>
            <details style={{ whiteSpace: 'pre-wrap', color: 'red' }}>
              <summary>Nerd info</summary>
              {this.state.error && this.state.error.toString()}
              {this.state.errorInfo.componentStack}
            </details>
          </Grid>
        </Grid>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;

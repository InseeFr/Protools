/* eslint-disable @typescript-eslint/no-unsafe-return */
import React from "react";
import { Box, Typography } from '@mui/material';

class ErrorBoundary extends React.Component {
  // eslint-disable-next-line react/state-in-constructor
  state = { hasError: false };

  componentDidCatch(error: unknown) {
    console.error(error);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.hasError) {
      return (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h1">
            Something went wrong. Please retry later
          </Typography>
        </Box>
      );
    }

    // @ts-expect-error - children is a prop
    // eslint-disable-next-line react/prop-types, react/destructuring-assignment
    return this.props.children;
  }
}

export default ErrorBoundary;

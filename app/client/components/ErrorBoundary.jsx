import React, { Component } from 'react';

const defaultError = () => <strong>Something went wrong.</strong>;

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      // rendercustom fallback UI
      return this.props.errorMessage || defaultError;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

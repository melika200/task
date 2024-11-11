// src/helpers/ErrorBoundary.js
import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught in ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          
          <button onClick={() => this.setState({ hasError: false })}>تلاش مجدد</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
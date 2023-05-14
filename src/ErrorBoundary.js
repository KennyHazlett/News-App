import React, { Component } from 'react';

// ErrorBoundary class component to catch errors in the component tree
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        // Initialize state with a flag to track if there's an error
        this.state = { hasError: false };
    }

    // Lifecycle method to update the state when an error occurs
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    // Lifecycle method to handle the side effects when an error is caught
    componentDidCatch(error, info) {
        // Log the error and additional info
        console.log('Error:', error, 'Info:', info.componentStack);
    }

    render() {
        // If there's an error, display a fallback message
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        // If there's no error, render the children components
        return this.props.children;
    }
}

export default ErrorBoundary;

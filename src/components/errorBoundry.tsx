import React from 'react'

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends React.Component<
  React.PropsWithChildren,
  State
> {
  state: State = {
    hasError: false,
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    }
  }

  componentDidCatch(error: Error) {
    console.error('App crashed:', error)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'sans-serif',
            gap: '12px',
          }}
        >
          <h2>Something went wrong</h2>

          <p>Please refresh the application</p>

          <button onClick={this.handleReload}>
            Reload App
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
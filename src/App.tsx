import React from 'react'
import { Button } from 'antd'
import ErrorBoundary from 'components/error-boundary'
import './App.less'

import { FullPageErrorFallback } from 'components/lib'

function App() {
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        <Button type="primary">Button</Button>
      </ErrorBoundary>
    </div>
  )
}

export default App

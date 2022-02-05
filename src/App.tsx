import React from 'react'
import ErrorBoundary from 'components/error-boundary'

import { FullPageErrorFallback, FullPageLoading } from 'components/lib'

// 动态加载组件
const UnauthenticatedApp = React.lazy(() => import('unauthenticated-app'))

function App() {
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        <React.Suspense fallback={<FullPageLoading />}>
          <UnauthenticatedApp></UnauthenticatedApp>
        </React.Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default App

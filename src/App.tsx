import React, { useEffect } from 'react'
import ErrorBoundary from 'components/error-boundary'

import { FullPageErrorFallback, FullPageLoading } from 'components/lib'
import { useAuth } from 'context/auth-context'

// 动态加载组件
const AuthenticatedApp = React.lazy(() => import('authenticated-app'))
const UnauthenticatedApp = React.lazy(() => import('unauthenticated-app'))

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        <React.Suspense fallback={<FullPageLoading />}>
          {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </React.Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default App

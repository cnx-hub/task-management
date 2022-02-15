import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { DevTools, loadServer } from 'jira-dev-tool'
// 务必要在jira之后引入

import { AppProviders } from 'context'

loadServer(() =>
  ReactDOM.render(
    <AppProviders>
      <DevTools />
      <App />
    </AppProviders>,
    document.getElementById('root')
  )
)

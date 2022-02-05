import React from 'react'
import ReactDOM from 'react-dom'
import { DevTools, loadServer } from 'jira-dev-tool'

import './App.less'
import App from './App'
import { AppProviders } from 'context'

loadServer(() =>
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <DevTools />
        <App />
      </AppProviders>
    </React.StrictMode>,
    document.getElementById('root')
  )
)

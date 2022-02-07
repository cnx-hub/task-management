import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { DevTools, loadServer } from 'jira-dev-tool'
// 务必要在jira之后引入
import './App.less'
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

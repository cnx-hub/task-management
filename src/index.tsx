import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { DevTools, loadServer } from 'jira-dev-tool'
// 务必要在jira之后引入
import { AppProviders } from 'context'

// if (process.env.NODE_ENV === 'development') {
//   const { mocks } = require('./mocks')
//   mocks.start({
//     onUnhandledRequest: 'bypass',
//     // serviceWorker: {
//     //     url: '/public/mockServiceWorker.js',
//     //   },
//   })
// }

// console.log(...userHandlers)

loadServer(() =>
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        {/* <DevTools /> */}
        <App />
      </AppProviders>
    </React.StrictMode>,
    document.getElementById('root')
  )
)

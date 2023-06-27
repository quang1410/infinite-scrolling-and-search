import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { StoreProvider } from './store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
)

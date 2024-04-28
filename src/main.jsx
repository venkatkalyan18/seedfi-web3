import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import TransactionProvider from './utils/TransactionContext.jsx'
import Camapigns from './Camapigns.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <TransactionProvider>
     <React.StrictMode>
    <App />
  </React.StrictMode>
  </TransactionProvider>,
 
)

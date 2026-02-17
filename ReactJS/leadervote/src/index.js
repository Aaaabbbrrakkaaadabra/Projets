import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import { signInAnon } from './services/firebase.js'

signInAnon() // connexion automatique dès le lancement

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

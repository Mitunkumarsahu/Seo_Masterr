import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from "@react-oauth/google";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">

      <App />
      </GoogleOAuthProvider>

    </BrowserRouter>
  </React.StrictMode>
);

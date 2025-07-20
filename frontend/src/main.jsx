import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme.js'; // path to your theme file


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeProvider theme={theme}>

    <GoogleOAuthProvider clientId="284681747746-28vo0j4vmf79lbu3ia7oqqljmu7cc4on.apps.googleusercontent.com">

      <App />
      </GoogleOAuthProvider>
      </ThemeProvider>

    </BrowserRouter>
  </React.StrictMode>
);




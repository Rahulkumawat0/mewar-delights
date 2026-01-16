import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import React from 'react'
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
     <CartProvider>
      <AuthProvider>
      <App />
      </AuthProvider>
     </CartProvider>
  </React.StrictMode>,
)

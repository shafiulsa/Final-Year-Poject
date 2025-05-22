import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import router from './router/Router.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'
import ThemeProvider from './context/ThemeContext.jsx'
import { Toaster } from 'react-hot-toast';
createRoot(document.getElementById('root')).render(
  <div  >
       

    <AuthProvider>
      <ThemeProvider>
      <StrictMode>
        <RouterProvider router={router}>
        <Toaster position="top-center" reverseOrder={false} /> {/* ✅ Add Toaster here */}

        </RouterProvider>
      </StrictMode>
      </ThemeProvider>

    </AuthProvider>
  </div>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Import all your custom CSS styles
import './css/bootstrap.min.css';
import './css/pixel.css';
import './css/style.css';
import './css/draggable.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

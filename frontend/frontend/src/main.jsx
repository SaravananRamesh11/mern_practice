import React from 'react'; // ✅ Add this line
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CounterProvider } from './context/cont';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CounterProvider>
      <App />
    </CounterProvider>
  </React.StrictMode>
);

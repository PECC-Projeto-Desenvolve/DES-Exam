import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Analytics } from '@vercel/analytics/react';


import { ThemeProvider } from '@material-tailwind/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
      <Analytics />
    </ThemeProvider>
  </React.StrictMode>,
);

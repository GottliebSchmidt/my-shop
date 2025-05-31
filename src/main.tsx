import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { AdminProvider } from './context/AdminContext';
import { HelmetProvider } from 'react-helmet-async';  // <-- импортируем
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <HelmetProvider>
            <AdminProvider>
                <App />
            </AdminProvider>
        </HelmetProvider>
    </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AdminStrategy } from './components/AdminStrategy';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// Simple client-side routing
const path = window.location.pathname;
const search = window.location.search;

// Check if we are on the admin path or have the query param
const isAdmin = path === '/admin' || search.includes('admin=true');

root.render(
  <React.StrictMode>
    {isAdmin ? <AdminStrategy /> : <App />}
  </React.StrictMode>
);
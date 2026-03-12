import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { UsersProvider } from './context/UsersContext';
import { FormsProvider } from './context/FormsContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <UsersProvider>
        <FormsProvider>
          <App />
        </FormsProvider>
      </UsersProvider>
    </BrowserRouter>
  </React.StrictMode>
);

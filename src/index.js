import React from 'react';
import ReactDOM from 'react-dom/client';
import ResetStyle from './style/ResetStyle';
import App from './App';
import GlobalStyle from './style/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ResetStyle />
    <GlobalStyle />
    <App />
  </React.StrictMode>
);


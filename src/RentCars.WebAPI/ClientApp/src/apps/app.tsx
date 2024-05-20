import React from 'react';
import ReactDOM from 'react-dom/client';
import { MainRouter } from './mainRouter';
import "react-widgets/styles.css";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MainRouter />
  </React.StrictMode>
);
import React from 'react';
import ReactDOM from 'react-dom/client';
import { MainRouter } from './mainRouter';
import "react-widgets/styles.css";
import { Notifications } from '../components/notifications/notifications';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Notifications />
    <MainRouter />
  </React.StrictMode>
);
import ReactDOM from 'react-dom/client';
import { MainRouter } from './mainRouter';
import "react-widgets/styles.css";
import { Notifications } from '../components/notifications/notifications';
import '../tools/utils/stringConstructor'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <Notifications />
    <MainRouter />
  </>
);
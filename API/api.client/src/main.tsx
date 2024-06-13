import ReactDOM from 'react-dom/client'
import { Notifications } from './components/notifications/notifications.tsx'
import { MainRouter } from './apps/mainRouter.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
  <Notifications />
  <MainRouter />
</>
)

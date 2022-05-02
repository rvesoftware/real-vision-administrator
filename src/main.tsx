import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
import './styles/main.css'
import './styles/table.css'
import './styles/calendar.css'
import ContextWrapper from './context/ContextWrapper'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <ContextWrapper>
      <App />
      </ContextWrapper>

    </React.StrictMode>
  </Provider>
)

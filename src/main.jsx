import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import GlobalStyle from './styles/globalStyles.jsx'
import ResetStyle from './styles/ResetStyle.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ResetStyle/> 
    <GlobalStyle/>
    <App />
  </React.StrictMode>,
)

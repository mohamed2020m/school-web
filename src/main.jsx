import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import CamerasProvider from './context/CamerasProvider'
import RolesProvider from './context/RolesProvider'

ReactDOM.render(
  <RolesProvider>
    <App />
  </RolesProvider>,
  document.getElementById('root')
)

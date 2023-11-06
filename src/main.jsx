import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import RolesProvider from './context/roles/RolesProvider'
import FilieresProvider from './context/filieres/FilieresProvider'
import StudentsProvider from './context/students/StudentsProvider'

ReactDOM.render(
  <StudentsProvider>
    <FilieresProvider>
        <RolesProvider>
          <App />
        </RolesProvider>
      </FilieresProvider>
  </StudentsProvider>,
  document.getElementById('root')
)

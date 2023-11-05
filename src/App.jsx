import React from 'react'
import { RoleList } from './components/roles/RoleList'
import { BrowserRouter, Routes, Route, Link  } from 'react-router-dom';
import { school } from './assets';

const App = () => {
  return (
    <>
      <main className='flex flex-col items-center bg-primary min-h-screen'>
        <div className='container p-4'>
            <div className='flex items-center'>
              <img src={school} width={50}/>
              <h1 className='text-3xl mx-2 font-sans font-semibold'> Student App</h1>
            </div>

          <BrowserRouter>
            <div>
              <nav>
                <ul>
                  <li>
                    <Link to="/roles">Roles</Link>
                  </li>
                  <li>
                    <Link to="/filieres">Filieres</Link>
                  </li>
                </ul>
              </nav>

              <Routes>
                <Route path="/" element={<RoleList />}>
                  <Route index element={<RoleList />} />
                  <Route path="roles" element={<RoleList />} />
                  <Route path="filieres" element={<RoleList />} />
                </Route>
              </Routes>
            </div>
          </BrowserRouter>
          
        </div>
      </main>
    </>
  )
}

export default App



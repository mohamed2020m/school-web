import React from 'react'
import { RoleList } from './components/roles/RoleList'
import { FilieresList } from './components/filieres/FilieresList'
import { StudentsList } from './components/students/StudentsList'
import { BrowserRouter, Routes, Route, Link  } from 'react-router-dom';
import {StickyNavbar} from './components/StickyNavbar';
import {NotFound} from './components/NotFound';

const App = () => {
  return (
    <>
      <StickyNavbar />
      <main className='flex flex-col items-center bg-primary min-h-screen'>
        <div className='container p-4'>
    
          <BrowserRouter>
            <div>
              <Routes>
                <Route>
                  <Route index element={<StudentsList />} />
                  <Route path="students" element={<StudentsList />} />
                  <Route path="roles" element={<RoleList />} />
                  <Route path="filieres" element={<FilieresList />} />
                  <Route path="*" element={<NotFound />} />
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





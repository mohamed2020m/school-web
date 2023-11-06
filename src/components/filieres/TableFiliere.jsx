import React from 'react'

export const TableFiliere = ({ children }) => {
  return (
    <div className='flex flex-col mt-2'>
      <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block py-2 min-w-full sm:px-6 lg:px-8'>
          <div className='overflow-hidden shadow-md rounded-lg'>
            <table className='min-w-full'>
              <thead className='bg-gray-100 font-semibold'>
                <tr>
                  <th
                    scope='col'
                    className='py-3 px-6 text-xs tracking-wider text-left text-gray-700 uppercase'
                  >
                    Id
                  </th>
                  <th
                    scope='col'
                    className='py-3 px-6 text-xs tracking-wider text-left text-gray-700 uppercase'
                  >
                    Code Filiere
                  </th>
                  <th
                    scope='col'
                    className='py-3 px-6 text-xs tracking-wider text-left text-gray-700 uppercase'
                  >
                    Libelle Filiere
                  </th>
                  <th
                    scope='col'
                    className='py-3 px-6 text-xs tracking-wider text-left text-gray-700 uppercase'
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {children}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

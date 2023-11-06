import React,{ useState } from 'react'
import { useFiliere } from '../../hooks/useFiliere'
import { Button } from '../Button'
import { ModalFiliere } from './ModalFiliere'
import { Spinner } from '../Spinner'
import { TableFiliere } from './TableFiliere'
import { FilieresItem } from './FilieresItem'


export const FilieresList = () => {
  const { filieres, loading, error } = useFiliere()
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      {loading && <Spinner />}

      {!loading && !error && (
        <>
          <div className='flex flex-col items-end mt-5'>
            <Button label='New Filiere' click={() => setShowModal(!showModal)} />
          </div>

          <TableFiliere>
            {filieres.map(item => (
              <FilieresItem key={item?.id} filiere={item} />
            ))}

            {!filieres.length && (
              <tr className='bg-white'>
                <td colSpan={7} className='py-4 px-6 text-sm text-center'>
                  <p className='font-semibold'>There are no filieres. 😢</p>
                </td>
              </tr>
            )}
          </TableFiliere>
        </>
      )}

      {error && (
        <div className='flex items-center justify-center h-89v'>
          <p className='font-bold text-red-500 text-xl'>
            {error} 😢
          </p>
        </div>
      )}

      {showModal && <ModalFiliere onClose={() => setShowModal(!showModal)} />}
    </>
  )
}

import React,{ useState } from 'react'
import { Dialog } from '../Dialog'
import { ModalFiliere } from './ModalFiliere'
import { useFiliere } from '../../hooks/useFiliere'
import { deleteFiliere } from '../../services/filiere'
import {BsFillTrash3Fill} from 'react-icons/bs';
import {BiSolidEditAlt} from 'react-icons/bi';


export const FilieresItem= ({ filiere }) => {
  const { id, code, libelle } = filiere

  const { dispatch } = useFiliere()
  const [showDialogDelete, setShowDialogDelete] = useState(false)
  const [showDialogEdit, setShowDialogEdit] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)
  const [error, setError] = useState(false)

  const handlerDelete = async () => {
    setBtnLoading(true)
    setError(false)


    const { error } = await deleteFiliere(id)

    if (!error) {
      dispatch({ type: 'DELETE_Filiere', payload: id })
      return
    }

    setError(true)
    setBtnLoading(false)
  }

  return (
    <>
      <tr className='border-b odd:bg-white even:bg-gray-100 odd:bg-white even:bg-gray-50 border-gray-50'>
        <td className='py-4 px-6 text-sm'>
          {id}
        </td>
        <td className='py-4 px-6 text-sm'>{code}</td>
        <td className='py-4 px-6 text-sm'>{libelle}</td>
        <td className='py-4 px-6 text-sm whitespace-nowrap space-x-3'>
          <button
            onClick={() => setShowDialogEdit(true)}
            className='bg-green-500 hover:bg-green-600 text-white font-bold p-2 rounded-xl'
          >
            <BiSolidEditAlt />
          </button>
          <button
            className='bg-red-500 hover:bg-red-600 text-white font-bold p-2 rounded-xl'
            onClick={() => setShowDialogDelete(true)}
          >
            <BsFillTrash3Fill />
          </button>
        </td>
      </tr>

      {showDialogDelete && (
        <Dialog
          click={handlerDelete}
          onClose={() => {
            setShowDialogDelete(false)
            setError(false)
            setBtnLoading(false)
          }}
          error={error}
          btnLoading={btnLoading}
        />
      )}

      {showDialogEdit && (
        <ModalFiliere isEdit item={filiere} onClose={() => setShowDialogEdit(false)} />
      )}
    </>
  )
}

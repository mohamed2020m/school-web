import React,{ useState } from 'react'
import { useFiliere } from '../../hooks/useFiliere'
import { useForm } from '../../hooks/useForm'
import { Button } from '../Button'
import { RawModal } from '../RawModal'
import { TextInput } from '../TextInput'
import { addFiliere, editFiliere} from '../../services/filiere'



export const ModalFiliere = ({ onClose, isEdit, item }) => {
  const [isValid, setIsValid] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)
  const [error, setError] = useState(false)

  const { dispatch } = useFiliere()

  const { values, handlerChange } = useForm({
    code: isEdit ? item.code : '',
    libelle: isEdit ? item.libelle : '',
  })

  const { code, libelle } = values

  const handlerAdd = async (e) => {
    e.preventDefault()

    if (
      code !== '' && libelle !== '' 
    ) {
      setBtnLoading(true)
      setIsValid(false)
      setError(false)

      const { error, dataFiliere } = await addFiliere(values)

      if (!error) {
        dispatch({ type: 'ADD_Filiere', payload: dataFiliere })
        onClose()
        return
      }

      setError(true)
      setBtnLoading(false)
      return
    }

    setIsValid(true)
    setError(false)
  }

  const handlerEdit = async (e) => {
    e.preventDefault();
  
    if (code !== '' && libelle !== '') {
      setBtnLoading(true);
      setIsValid(false);
      setError(false);
  
      const { error } = await editFiliere(item?.id, values); 
      if (!error) {
        dispatch({
          type: 'EDIT_Filiere',
          payload: { ...item, ...values } 
        });
  
        onClose();
        return;
      }
  
      setError(true);
      setBtnLoading(false);
      return;
    }
  
    setIsValid(true);
    setError(false);
  };


  return (
    <RawModal onClose={onClose}>
      <form
        onSubmit={isEdit ? handlerEdit : handlerAdd}
        className='flex flex-col -mt-4 p-5 space-y-4 lg:px-8 sm:pb-6 xl:pb-8'
      >
        <h3 className='text-xl text-center font-medium text-gray-600'>
          {isEdit ? 'Edit Filiere' : 'Add a new Role'}
        </h3>

        <TextInput
          name='code'
          placeholder='Code'
          value={code}
          onChange={handlerChange}
        />

        <TextInput
          name='libelle'
          placeholder='Libelle'
          value={libelle}
          onChange={handlerChange}
        />

        {/* Validation and Errors */}
        {isValid && (
          <div className='flex items-center justify-end'>
            <p className='text-red-500 text-sm font-bold'>
              All fields are required.
            </p>
          </div>
        )}

        {error && (
          <div className='flex items-center justify-end'>
            <p className='text-red-500 text-sm font-bold'>
              Something went wrong.
            </p>
          </div>
        )}

        <hr />

        {/* Footer */}
        <div className='flex items-center justify-end space-x-2'>
          <Button label='Close' isClose click={onClose} />
          <Button
            label={btnLoading ? 'Loading...' : isEdit ? 'Edit' : 'Add'}
            isSubmit
            isLoading={btnLoading}
          />
        </div>
      </form>
    </RawModal>
  )
}

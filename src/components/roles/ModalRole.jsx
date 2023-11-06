import React,{ FC, FormEvent, useState } from 'react'
import { useRoles } from '../../hooks/useRoles'
import { useForm } from '../../hooks/useForm'
import { addRole, editRole } from '../../services/roles'
import { Button } from '../Button'
import { RawModal } from '../RawModal'
import { TextInput } from '../TextInput'

export const ModalRole = ({ onClose, isEdit, item }) => {
  const [isValid, setIsValid] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)
  const [error, setError] = useState(false)

  const { dispatch } = useRoles()

  const { values, handlerChange } = useForm({
    name: isEdit ? item.name : '',
  })

  const { name } = values

  const handlerAdd = async (e) => {
    e.preventDefault()

    if (
      name !== '' 
    ) {
      setBtnLoading(true)
      setIsValid(false)
      setError(false)

      const { error, dataRole } = await addRole(values)

      if (!error) {
        dispatch({ type: 'ADD_Role', payload: dataRole })
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
  
    if (name !== '') {
      setBtnLoading(true);
      setIsValid(false);
      setError(false);
  
      const { error } = await editRole(item?._id, values); 
      if (!error) {
        dispatch({
          type: 'EDIT_Role',
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
          {isEdit ? 'Edit Role' : 'Add a new Role'}
        </h3>

        <TextInput
          name='name'
          placeholder='Name'
          value={name}
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

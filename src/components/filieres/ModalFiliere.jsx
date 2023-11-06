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
          {isEdit ? 'Edit camera' : 'Add a new Role'}
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

        {/* <TextInput
          name='brand'
          placeholder='Brand'
          value={"brand"}
          onChange={handlerChange}
        />

        <TextInput
          isNumberic
          name='price'
          placeholder='Price'
          value={"price"}
          onChange={handlerChange}
        />

        <select
          value={"connection_type"}
          onChange={handlerChange}
          name='connection_type'
          className='py-1 px-3 border-2 border-gray-200 rounded-xl transition ease-in-out focus:border-cyan-500 focus:outline-none'
        >
          <option value='WIFI'>Wifi</option>
          <option value='ETHERNET'>Ethernet</option>
          <option value='IP'>IP</option>
        </select> */}

        {/* <FileInput
          name={imgPath.name ? imgPath.name : 'Choose a image'}
          imgSelected={imgPreview}
        >
          <input
            className='h-full w-full opacity-0'
            type='file'
            name='image'
            onChange={({ target }) => {
              if (target.files && target.files[0]) {
                setImgPath(target.files[0])

                // Select the image
                const reader = new FileReader()
                reader.onload = () => {
                  setImgPreview(reader.result!)
                }

                reader.readAsDataURL(target.files[0])
              }
            }}
          />
        </FileInput> */}

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

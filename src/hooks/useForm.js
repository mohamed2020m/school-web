import { useState, ChangeEvent } from 'react'

export const useForm = (initValue) => {
  const [values, setValues] = useState(initValue)

  const handlerChange = ({target}) => {
    const { name, value } = target

    setValues({
      ...values,
      [name]: value
    })
  }

  return {
    values,
    handlerChange,
    setValues
  }
}

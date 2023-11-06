import React from 'react'

export const TextInput = ({
  name,
  placeholder,
  value,
  onChange,
  isNumberic
}) => {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={isNumberic ? 'number' : 'text'}
      max={isNumberic ? 999999 : undefined}
      className='py-1 px-3 border-2 border-gray-200 rounded-xl transition ease-in-out focus:border-cyan-500 focus:outline-none'
    />
  )
}

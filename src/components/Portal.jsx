import { createPortal } from 'react-dom'

export const Portal = ({ children }) => {
  const element = document.getElementById('portal')
  return createPortal(children, element)
}

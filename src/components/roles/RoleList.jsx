import React,{ useState } from 'react'
import { useRoles } from '../../hooks/useRoles'
import { Button } from '../Button'
import { ModalRole } from './ModalRole'
import { Spinner } from '../Spinner'
import { TableRole } from './TableRole'
import { RolesItem } from './rolesItem'


export const RoleList = () => {
  const { roles, loading, error } = useRoles()
  const [showModal, setShowModal] = useState(false)

  console.log("roles", roles);
  console.log("error", error);
  return (
    <>
      {loading && <Spinner />}

      {!loading && !error && (
        <>
          <div className='flex flex-col items-end mt-5'>
            <Button label='New Role' click={() => setShowModal(!showModal)} />
          </div>

          <TableRole>
            {roles.map(item => (
              <RolesItem key={item._id} role={item} />
            ))}

            {!roles.length && (
              <tr className='bg-white'>
                <td colSpan={7} className='py-4 px-6 text-sm text-center'>
                  <p className='font-semibold'>There are no roles. 😢</p>
                </td>
              </tr>
            )}
          </TableRole>
        </>
      )}

      {error && (
        <div className='flex items-center justify-center h-89v'>
          <p className='font-bold text-red-500 text-xl'>
            {error} 😢
          </p>
        </div>
      )}

      {showModal && <ModalRole onClose={() => setShowModal(!showModal)} />}
    </>
  )
}

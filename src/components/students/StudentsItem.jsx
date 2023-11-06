import React,{ useState } from 'react'
import { useStudents } from '../../hooks/useStudents'
import { deleteStudent } from '../../services/students'
import { Dialog } from '../Dialog'
import { ModalStudents } from './ModalStudents'
import {BsFillTrash3Fill} from 'react-icons/bs';
import {BiSolidEditAlt} from 'react-icons/bi';


export const StudentsItem = ({ student, filieresList, rolesList}) => {
    const { id, username, name, email, phone, filiere, roles} = student

    const { dispatch } = useStudents()
    const [showDialogDelete, setShowDialogDelete] = useState(false)
    const [showDialogEdit, setShowDialogEdit] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const [error, setError] = useState(false)
    
    const handlerDelete = async () => {
        setBtnLoading(true)
        setError(false)

        const { error } = await deleteStudent(id)

        if (!error) {
        dispatch({ type: 'DELETE_Student', payload: id })
        return
        }

        setError(true)
        setBtnLoading(false)
    }

    return (
        <>
        <tr className='border-b odd:bg-white even:bg-gray-100 odd:bg-white even:bg-gray-50 border-gray-50'>
            <td className='py-4 px-6 text-sm'>{id}</td>
            <td className='py-4 px-6 text-sm whitespace-nowrap'>{username}</td>
            <td className='py-4 px-6 text-sm whitespace-nowrap'>{name}</td>
            <td className='py-4 px-6 text-sm whitespace-nowrap'>{email}</td>
            <td className='py-4 px-6 text-sm whitespace-nowrap'>{phone}</td>
            <td className='py-4 px-6 text-sm whitespace-nowrap'>{filiere.code}</td>
            <td className='py-4 px-6 text-sm whitespace-nowrap'>
                {roles.map( (role, index) => (
                    <span key={role.id}>
                        {role.name}
                        {index !== roles.length - 1 && ', '}
                    </span>
                ))}
            </td>
            <td className='py-4 px-6 text-sm whitespace-nowrap space-x-3'>
            <button
                onClick={() => setShowDialogEdit(true)}
                className='bg-green-500 hover:bg-green-600 text-white font-bold p-1.5 rounded-xl'
            >
                <BiSolidEditAlt />
            </button>
            <button
                className='bg-red-500 hover:bg-red-600 text-white font-bold p-1.5 rounded-xl'
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

        {showDialogEdit && filieresList.length > 0 && (
            <ModalStudents isEdit item={student} filieresList={filieresList} rolesList={rolesList} onClose={() => setShowDialogEdit(false)} />
        )}
        </>
    )
}

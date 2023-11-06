import React,{ useEffect, useState } from 'react'
import { useStudents } from '../../hooks/useStudents'
import { Button } from '../Button'
import { StudentsItem } from './StudentsItem'
import { ModalStudents } from './ModalStudents'
import { Spinner } from '../Spinner'
import { Table } from './TableStudents'
import axios from 'axios'
import { API_URL } from '../../utils/base-url'

export const StudentsList = () => {
    const { students, loading, error } = useStudents()
    const [showModal, setShowModal] = useState(false)

    const [filieresList, setFilieresList] = useState([])
    const [rolesList, setRolesList] = useState([])

    const fetchFilieres = async () => {
        try {
            const { data } = await axios.get(API_URL + "/filieres");
            setFilieresList(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchRoles = async () => {
        try {
            const { data } = await axios.get(API_URL + "/roles");
            setRolesList(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect( () => {
        fetchFilieres()
        fetchRoles()
    }, [])

    return (
        <>
        {loading && <Spinner />}

        {!loading && !error && (
            <>
            <div className='flex flex-col items-end mt-5'>
                <Button label='New Student' click={() => setShowModal(!showModal)} />
            </div>

            <Table>
                {students.map(item => (
                    <StudentsItem key={item.id} student={item} filieresList={filieresList} rolesList={rolesList}/>
                ))}

                {!students.length && (
                <tr className='bg-white'>
                    <td colSpan={7} className='py-4 px-6 text-sm text-center'>
                    <p className='font-semibold'>There are no students. 😢</p>
                    </td>
                </tr>
                )}
            </Table>
            </>
        )}

        {error && (
            <div className='flex items-center justify-center h-89v'>
            <p className='font-bold text-red-500 text-xl'>
                {error} 😢
            </p>
            </div>
        )}

        {showModal && filieresList.length > 0 &&<ModalStudents filieresList={filieresList} rolesList={rolesList} onClose={() => setShowModal(!showModal)} />}
        </>
    )
}

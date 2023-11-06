import { useContext } from 'react'
import StudentsContext from '../context/students/StudentsContext'

export const useStudents = () => {
    const { state, dispatch } = useContext(StudentsContext)

    return {
        ...state,
        dispatch
    }
}
import React, { useReducer, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../../utils/base-url'
import StudentsReducer from '../../reducers/StudentsReducer'
import StudentsContext from './StudentsContext'

const INIT_STATE = {
    students: [],
    loading: true,
    error: null
}

const StudentsProvider= ({ children }) => {
    const [state, dispatch] = useReducer(StudentsReducer, INIT_STATE)
    const result = { dataStudents: []};

    const getStudents = async () => {
        try {
            const { data } = await axios.get(API_URL + '/student')
            
            console.log("data: ", data);
            
            result.dataStudents = data.map((backendStudent) => {
                return {
                    id: backendStudent.id, 
                    name: backendStudent.name,
                    username : backendStudent.username,
                    email : backendStudent.email,
                    phone : backendStudent.phone,
                    filiere : backendStudent.filiere,
                    roles : backendStudent.roles
                };
            });

            dispatch({ type: 'SET_Student', payload: result.dataStudents })
        } catch (e) {
            dispatch({ type: 'SET_ERROR', payload: 'Something went wrong.' })
            console.error(e)
        }
    }

    useEffect(() => {
        getStudents()
    }, [])

    return (
        <StudentsContext.Provider value={{ state, dispatch }}>
            {children}
        </StudentsContext.Provider>
    )
}

export default StudentsProvider

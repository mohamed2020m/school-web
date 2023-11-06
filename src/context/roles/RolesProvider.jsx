import React, { useReducer, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../../utils/base-url'
import RolesReducer from '../../reducers/RolesReducer'
import RolesContext from './RolesContext'

const INIT_STATE = {
    roles: [],
    loading: true,
    error: null
}

const RolesProvider= ({ children }) => {
    const [state, dispatch] = useReducer(RolesReducer, INIT_STATE)
    const result = { dataRoles: []};

    const getRoles = async () => {
        try {
            const { data } = await axios.get(API_URL + '/roles')

            result.dataRoles = data.map((backendRole) => {
                return {
                    _id: String(backendRole.id), 
                    name: backendRole.name,
                };
            });

            dispatch({ type: 'SET_Role', payload: result.dataRoles })
        } catch (e) {
            dispatch({ type: 'SET_ERROR', payload: 'Something went wrong.' })
            console.error(e)
        }
    }

    useEffect(() => {
        getRoles()
    }, [])

    return (
        <RolesContext.Provider value={{ state, dispatch }}>
            {children}
        </RolesContext.Provider>
    )
}

export default RolesProvider

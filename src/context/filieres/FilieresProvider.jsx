import React, { useReducer, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../../utils/base-url'
import FilieresReducer from '../../reducers/FilieresReducer'
import FilieresContext from './FilieresContext'

const INIT_STATE = {
    Filieres: [],
    loading: true,
    error: null
}

const FilieresProvider= ({ children }) => {
    const [state, dispatch] = useReducer(FilieresReducer, INIT_STATE)
    const result = { dataFilieres: []};

    const getFilieres = async () => {
        try {
            const { data } = await axios.get(API_URL + "/filieres")
            dispatch({ type: 'SET_Filiere', payload: data })
        } catch (e) {
            dispatch({ type: 'SET_ERROR', payload: 'Something went wrong.' })
            console.error(e)
        }
    }

    useEffect(() => {
        getFilieres()
    }, [])

    return (
        <FilieresContext.Provider value={{ state, dispatch }}>
            {children}
        </FilieresContext.Provider>
    )
}

export default FilieresProvider

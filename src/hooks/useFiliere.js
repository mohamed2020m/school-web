import { useContext } from 'react'
import FilieresContext from '../context/filieres/FilieresContext'

export const useFiliere = () => {
    const { state, dispatch } = useContext(FilieresContext)

    return {
        ...state,
        dispatch
    }
}

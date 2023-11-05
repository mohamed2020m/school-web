import { useContext } from 'react'
import RolesContext from '../context/RolesContext'

export const useRoles = () => {
    const { state, dispatch } = useContext(RolesContext)

    return {
        ...state,
        dispatch
    }
}

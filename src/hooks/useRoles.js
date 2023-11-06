import { useContext } from 'react'
import RolesContext from '../context/roles/RolesContext'

export const useRoles = () => {
    const { state, dispatch } = useContext(RolesContext)

    return {
        ...state,
        dispatch
    }
}

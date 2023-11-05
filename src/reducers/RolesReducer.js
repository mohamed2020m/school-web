// import { RolesActions, ContextStateRole } from '../interfaces/Role'

const RolesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_Role':
        return {
            ...state,
            loading: false,
            roles: action.payload
        }

    case 'SET_ERROR':
        return {
            ...state,
            loading: false,
            error: action.payload
        }

    case 'ADD_Role':
        return {
            ...state,
            roles: [...state.roles, action.payload]
        }

    case 'DELETE_Role':
        return {
            ...state,
            roles: state.roles.filter(role => role._id !==  action.payload)
        }

    // case 'EDIT_Role':
    //     const found =  state.roles.find(item => item._id === action.payload._id)

    //     return {
    //         ...state,
    //         roles: state.roles.map(role => {
    //         if(found) {
    //             Object.assign(found, action.payload)
    //             return {
    //                 ...role
    //             }
    //         }

    //         return role
    //         })
    //     }

    case 'EDIT_Role':
        const foundIndex = state.roles.findIndex(item => item._id === action.payload._id);

        if (foundIndex !== -1) {
            const updatedRoles = [...state.roles];
            updatedRoles[foundIndex] = { ...updatedRoles[foundIndex], ...action.payload };

            return {
                ...state,
                roles: updatedRoles
            };
        }

        return state;


    default:
      return state
  }
}

export default RolesReducer

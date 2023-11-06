
const FilieresReducer = (state, action) => {
    switch (action.type) {
      case 'SET_Filiere':
            return {
                ...state,
                loading: false,
                filieres: action.payload
            }
  
      case 'SET_ERROR':
          return {
              ...state,
              loading: false,
              error: action.payload
          }
  
      case 'ADD_Filiere':
          return {
            ...state,
            filieres: [...state.filieres, action.payload]
        }
  
      case 'DELETE_Filiere':
          return {
              ...state,
              filieres: state.filieres.filter(filiere => filiere.id !==  action.payload)
          }
  
      case 'EDIT_Filiere':
          const foundIndex = state.filieres.findIndex(item => item.id === action.payload.id);
  
          if (foundIndex !== -1) {
              const updatedRoles = [...state.filieres];
              updatedRoles[foundIndex] = { ...updatedRoles[foundIndex], ...action.payload };
  
              return {
                  ...state,
                  filieres: updatedRoles
              };
          }
  
          return state;
  
  
      default:
        return state
    }
  }
  
  export default FilieresReducer
  
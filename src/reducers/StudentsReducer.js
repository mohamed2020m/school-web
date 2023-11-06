const StudentsReducer = (state, action) => {
    switch (action.type) {
      case 'SET_Student':
          return {
              ...state,
              loading: false,
              students: action.payload
          }
  
      case 'SET_ERROR':
          return {
              ...state,
              loading: false,
              error: action.payload
          }
  
      case 'ADD_Student':
          return {
              ...state,
              students: [...state.students, action.payload]
          }
  
      case 'DELETE_Student':
          return {
              ...state,
              students: state.students.filter(student => student.id !==  action.payload)
          }
  
      case 'EDIT_Student':
          const foundIndex = state.students.findIndex(item => item.id === action.payload.id);
  
          if (foundIndex !== -1) {
              const updatedStudents = [...state.students];
              updatedStudents[foundIndex] = { ...updatedStudents[foundIndex], ...action.payload };
  
              return {
                  ...state,
                  students: updatedStudents
              };
          }
  
          return state;
  
  
      default:
        return state
    }
  }
  
  export default StudentsReducer
  
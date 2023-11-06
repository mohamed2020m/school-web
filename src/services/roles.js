import axios from 'axios'
import { API_URL } from '../utils/base-url'

export const addRole = async (newRole) => {
    const result = { dataRole: {}, error: false }

    try {
        const { data } = await axios.post(`${API_URL}/roles`, newRole);

        result.dataRole = {
            _id: String(data.id),
            name: data.name,
        }

    } catch (e) {
        result.error = true
        console.error(e)
    }

    return result
}



// export const editRole = async (
//     id: string,
//     roleEdited: RoleDTO
// ) => {
//     const result = { dataRole: {} as Role, error: false }

//     try {
//         // const { data } = await axios.put(`${API_URL}/${id}`, roleEdited)
//         // result.dataRole = data

//         await axios.put(`${API_URL}/${id}`, roleEdited)

//         // result.dataRole = {
//         //     _id: String(data.id),
//         //     name: data.name,
//         // }

//     } catch (e) {
//         result.error = true
//         console.error(e)
//     }

//     // return result
// }

export const editRole = async (id, roleEdited) => {
    const result = { error: false };
  
    try {
      await axios.put(`${API_URL}/roles/${id}`, roleEdited);
    } catch (e) {
      result.error = true;
      console.error(e);
    }
  
    return result;
  }

export const deleteRole = async (id) => {
    const result = { error: false }

    try {
        await axios.delete(`${API_URL}/roles/${id}`)
    } catch (e) {
        result.error = true
        console.error(e)
    }

    return result
}

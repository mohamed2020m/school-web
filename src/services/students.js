import axios from 'axios'
import { API_URL } from '../utils/base-url'

export const addStudent = async (newStudent) => {
    const result = { dataStudent: {}, error: false }

    try {
        const { data } = await axios.post(`${API_URL}/student`, newStudent);
        
        result.dataStudent = {
            id: data.id,
            username: data.username,
            name : data.name,
            email: data.email,
            phone : data.phone,
            filiere : data.filiere,
            roles: data.roles
        }

        return result;
    } catch (e) {
        result.error = true
        console.error(e)
    }
}


export const editStudent = async (id, studentEdited) => {
    const result = { error: false };
  
    try {

        const {data} = await axios.put(`${API_URL}/student/${id}`, studentEdited);
        console.log("data", data);
    } catch (e) {
        result.error = true;
        console.error(e);
    }
  
    return result;
}

export const deleteStudent = async (id) => {
    const result = { error: false }

    try {
        await axios.delete(`${API_URL}/student/${id}`)
    } catch (e) {
        result.error = true
        console.error(e)
    }

    return result
}

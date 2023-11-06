import axios from 'axios'
import { API_URL } from '../utils/base-url'

export const addFiliere = async (newFiliere) => {
    const result = { dataFiliere: {}, error: false }

    try {
        const { data } = await axios.post(`${API_URL}/filieres`, newFiliere);
        
        result.dataFiliere = {
            id: data.id,
            code: data.code,
            libelle: data.libelle
        }

        return result;
    } catch (e) {
        result.error = true
        console.error(e)
    }
}


export const editFiliere = async (id, filiereEdited) => {
    const result = { error: false };
  
    try {
      await axios.put(`${API_URL}/filieres/${id}`, filiereEdited);
    } catch (e) {
      result.error = true;
      console.error(e);
    }
  
    return result;
}

export const deleteFiliere = async (id) => {
    const result = { error: false }

    try {
        await axios.delete(`${API_URL}/filieres/${id}`)
    } catch (e) {
        result.error = true
        console.error(e)
    }

    return result
}

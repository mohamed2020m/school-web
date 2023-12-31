import axios from 'axios'
// import { Camera, CameraDTO } from '../interfaces'
import { API_URL } from '../utils/base-url'

export const addCamera = async (newCamera, image) => {
  const result = { dataCamera: {}, error: false }

  const { name, model, brand, connection_type, price } = newCamera
  const FD = new FormData()
  FD.append('name', name)
  FD.append('model', model)
  FD.append('brand', brand)
  FD.append('connection_type', connection_type)
  FD.append('price', price)
  FD.append('img', image)

  try {
    const { data } = await axios.post(`${API_URL}/add`, FD)
    result.dataCamera = data
  } catch (e) {
    result.error = true
    console.error(e)
  }

  return result
}

export const editCamera = async (
  id,
  cameraEdited,
  image
) => {
  const result = { dataCamera: {}, error: false }

  const { name, model, brand, connection_type, price } = cameraEdited
  const FD = new FormData()
  FD.append('name', name)
  FD.append('model', model)
  FD.append('brand', brand)
  FD.append('connection_type', connection_type)
  FD.append('price', price )
  FD.append('img', image)

  try {
    const { data } = await axios.put(`${API_URL}/edit/${id}`, FD)
    result.dataCamera = data
  } catch (e) {
    result.error = true
    console.error(e)
  }

  return result
}

export const deleteCamera = async (id) => {
  const result = { error: false }

  try {
    await axios.delete(`${API_URL}/delete/${id}`)
  } catch (e) {
    result.error = true
    console.error(e)
  }

  return result
}

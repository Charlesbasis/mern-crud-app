import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getItems = () => API.get('/items')
export const createItem = (item) => API.post('/items', item)
export const getItem = (id) => API.get(`/items/${id}`)
export const updateItem = (id, item) => API.put(`/items/${id}`, item)
export const deleteItem = (id) => API.delete(`/items/${id}`)

export default API
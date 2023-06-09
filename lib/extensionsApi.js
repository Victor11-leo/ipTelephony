import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:4040/api/'
})

export const getExtensions = () => api.get('/extensions').then(res => res.data)
export const createExtensions = (data) => api.post('/extensions',data).then(res => res.data)
export const updateExtensions = () => api.put('/extensions').then(res => res.data)
export const deleteExtensions = () => api.delete('/extensions').then(res => res.data)

export const getAdmins = () => api.get('/admins').then(res => res.data)
export const createAdmins = (data) => api.post('/admins',data).then(res => res.data)
export const updateAdmins = () => api.put('/admins').then(res => res.data)
export const deleteAdmins = () => api.delete('/admins').then(res => res.data)
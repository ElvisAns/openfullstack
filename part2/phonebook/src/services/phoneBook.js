import axios from 'axios'

const base_url = process.env.REACT_APP_ENV === "production" ? "" : "//localhost:3001"

const getAll = () => {
    const response = axios.get(`${base_url}/api/persons`)
    return response.then((res) => res.data)
}

const deleteById = (id) => {
    const response = axios.delete(`${base_url}/api/persons/${id}`)
    return response.then((res) => res.data)
}

const saveNew = (ob) => {
    const response = axios.post(`${base_url}/api/persons`, ob)
    return response.then((res) => res.data)
}

const updateOne = (id, ob) => {
    const response = axios.patch(`${base_url}/api/persons/${id}`, ob)
    return response.then((res) => res.data)
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll,
    deleteById,
    saveNew,
    updateOne
}
import axios from 'axios'

const getAll = () => {
    const response = axios.get("//localhost:3001/persons")
    return response.then((res) => res.data)
}

const deleteById = (id) => {
    const response = axios.delete(`//localhost:3001/persons/${id}`)
    return response.then((res) => res.data)
}

const saveNew = (ob) => {
    const response = axios.post("//localhost:3001/persons", ob)
    return response.then((res) => res.data)
}

const updateOne = (id, ob) => {
    const response = axios.patch(`//localhost:3001/persons/${id}`, ob)
    return response.then((res) => res.data)
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll,
    deleteById,
    saveNew,
    updateOne
}
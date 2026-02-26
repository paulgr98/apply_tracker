import axios from 'axios'

const BASE_URL = "http://localhost:8080/api/applications"

export const listAllApplications = () => axios.get(BASE_URL);
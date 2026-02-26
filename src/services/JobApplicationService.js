import axios from 'axios'

const BASE_URL = "http://localhost:8080/api/applications"

export const listAllApplications = () => axios.get(BASE_URL);
export const listAllStatus = () => axios.get(BASE_URL + "/statuses");
export const addApplication = (application) => axios.post(BASE_URL, application);
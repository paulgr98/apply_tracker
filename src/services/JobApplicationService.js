import axios from 'axios'

const BASE_URL = "http://localhost:8080/api/applications"

export const fetchAllJobApplications = () => axios.get(BASE_URL);
export const fetchAllApplicationStatuses = () => axios.get(BASE_URL + "/statuses");
export const addJobApplication = (application) => axios.post(BASE_URL, application);
export const deleteJobApplication = (id) => axios.delete(BASE_URL + "/" + id);
export const updateJobApplication = (id, application) => axios.put(BASE_URL + "/" + id, application);
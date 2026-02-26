import { listAllApplications } from '../../services/JobApplicationService'
import './JobApplication.css'
import { useEffect, useState } from 'react'

const JobApplication = () => {

    const [applications, setApplications] = useState([])
    useEffect(() => {
        getAllApplications();
    }, [])

    const getAllApplications = () => {
        listAllApplications().then((response) => {
            setApplications(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    const formatDate = (date) => {
        let isoDate = new Date(date);
        return isoDate.toLocaleDateString();
    }

    return (
        <>
            <div className="jobapplication">
                <div className='container'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th className="text-center">ID</th>
                                <th className="text-center">Date</th>
                                <th className="text-center">Company</th>
                                <th className="text-center">Position</th>
                                <th className="text-center">Link</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Comment</th>
                                <th className="text-center">CV</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                applications.map(application =>
                                    <tr key={application.id}>
                                        <td>{application.id}</td>
                                        <td>{formatDate(application.applicationDate)}</td>
                                        <td>{application.companyName}</td>
                                        <td>{application.positionName}</td>
                                        <td><a href={application.offerLink}>Click Me!</a></td>
                                        <td>{application.status}</td>
                                        <td>{application.comment}</td>
                                        <td>{application.cvFileName}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default JobApplication
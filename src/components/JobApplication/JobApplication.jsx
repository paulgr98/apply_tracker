import { listAllApplications, listAllStatus, addApplication } from '../../services/JobApplicationService'
import { JobApplicationModel } from './JobApplicationModel'
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

    const [statuses, setStatuses] = useState([]);
    useEffect(() => {
        getAllStatus();
    }, [])
    const getAllStatus = () => {
        listAllStatus().then((response) => {
            setStatuses(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    const today = new Date().toISOString().split("T")[0];
    const [date, setDate] = useState(today);
    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');
    const [offerLink, setOfferLink] = useState('');
    const [status, setStatus] = useState(statuses.length > 0 ? statuses[0] : '');
    const [comment, setComment] = useState('');
    const [cvFileName, setCvFileName] = useState('');

    const handleAddApplication = (event) => {
        event.preventDefault();

        addApplication({
            applicationDate: date,
            companyName: company,
            positionName: position,
            offerLink: offerLink,
            status: status,
            comment: comment,
            cvFileName: cvFileName
        }).then((response) => {
            clearInputFields();
            getAllApplications();
        }).catch(error => {
            console.error(error);
        })
    }

    const clearInputFields = () => {
        setDate(today);
        setCompany('');
        setPosition('');
        setOfferLink('');
        setStatus(statuses.length > 0 ? statuses[0] : '');
        setComment('');
        setCvFileName('');
    }

    const formatDate = (date) => {
        let isoDate = new Date(date);
        return isoDate.toLocaleDateString('pl-PL');
    }

    return (
        <>
            <div className="jobapplication">
                <div className='container'>
                    <form onSubmit={handleAddApplication}>
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
                                            <td className='longer'>{application.status}</td>
                                            <td>{application.comment}</td>
                                            <td>{application.cvFileName}</td>
                                        </tr>
                                    )
                                }
                                <tr className='inputrow'>

                                    <td>
                                        <button type="submit" className="btn btn-success">
                                            <span className='bi bi-plus'></span>
                                        </button>
                                    </td>
                                    <td>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={date}
                                            onChange={(event) => setDate(event.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input className="form-control" type="text" name='company'
                                            value={company}
                                            onChange={(event) => setCompany(event.target.value)} />
                                    </td>
                                    <td>
                                        <input className="form-control" type="text" name='position'
                                            value={position}
                                            onChange={(event) => setPosition(event.target.value)} />
                                    </td>
                                    <td>
                                        <input className="form-control" type="text" name='offer-link'
                                            value={offerLink}
                                            onChange={(event) => setOfferLink(event.target.value)} />
                                    </td>
                                    <td>
                                        <select className='form-select'
                                            value={status}
                                            onChange={(event) => setStatus(event.target.value)}>
                                            {
                                                statuses.map(status =>
                                                    <option key={status} value={status}>{status}</option>
                                                )
                                            }
                                        </select>
                                    </td>
                                    <td>
                                        <textarea className="form-control" id="comment" name='comment' rows="1"
                                            value={comment}
                                            onChange={(event) => setComment(event.target.value)} />
                                    </td>
                                    <td>
                                        <input className="form-control" type="text" name='cv-file'
                                            value={cvFileName}
                                            onChange={(event) => setCvFileName(event.target.value)} />
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </>
    )
}

export default JobApplication
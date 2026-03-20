import {
    fetchAllJobApplications,
    fetchAllApplicationStatuses,
    addJobApplication,
    updateJobApplication,
    deleteJobApplication
} from '../../services/JobApplicationService'
import './JobApplication.css'
import { useEffect, useRef, useState } from 'react'
import ContextMenu from '../ContextMenu'

const JobApplication = () => {

    const [applications, setApplications] = useState([])
    const contextMenuRef = useRef(null);
    const [contextMenu, setContextMenu] = useState({
        position: {
            x: 0,
            y: 0
        },
        toggled: false
    })

    useEffect(() => {
        getAllApplications();
    }, [])
    const getAllApplications = () => {
        fetchAllJobApplications().then((response) => {
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
        fetchAllApplicationStatuses().then((response) => {
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
    const [status, setStatus] = useState(statuses.length > 0 ? statuses[0] : 'Applied');
    const [comment, setComment] = useState('');
    const [cvFileName, setCvFileName] = useState('');

    const handleAddApplication = (event) => {
        event.preventDefault();

        addJobApplication({
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
        setStatus(statuses.length > 0 ? statuses[0] : 'Applied');
        setComment('');
        setCvFileName('');
    }

    const formatDate = (date) => {
        let isoDate = new Date(date);
        return isoDate.toLocaleDateString('pl-PL');
    }

    const handleOnContextMenu = (e, rightClickedApp) => {
        e.preventDefault();

        const contextMenuAttr = contextMenuRef.current.getBoundingClientRect()

        const isLeft = e.clientX < window?.innerWidth / 2

        let x
        let y = e.clientY

        if (isLeft) {
            x = e.clientX
        } else {
            x = e.clientX - contextMenuAttr.width
        }

        setContextMenu({
            position: {
                x,
                y
            },
            toggled: true
        })

        setApplications(
            applications.map(app => {
                return {
                    ...app,
                    selected: app.id === rightClickedApp.id
                }
            })
        )

    }

    useEffect(() => {
        const handler = (e) => {
            if (!contextMenuRef.current) {
                return
            }
            if (!contextMenuRef.current.contains(e.target)) {
                resetContextMenu()
            }
        }
        document.addEventListener('click', handler)

        return () => {
            document.removeEventListener('click', handler)
        }
    })

    const resetContextMenu = () => {
        setApplications(
            applications.map((app) => {
                return {
                    ...app,
                    selected: false
                };
            })
        );

        setContextMenu({
            position: {
                x: 0,
                y: 0
            },
            toggled: false
        });
    }


    const [editingAppId, setEditingAppId] = useState(null);

    useEffect(() => {
        if (editingAppId !== null) {
            const appToEdit = applications.find(app => app.id === editingAppId);
            if (appToEdit) {
                setEditingDate(appToEdit.applicationDate);
                setEditingCompany(appToEdit.companyName);
                setEditingPosition(appToEdit.positionName);
                setEditingOfferLink(appToEdit.offerLink);
                setEditingStatus(appToEdit.status);
                setEditingComment(appToEdit.comment);
                setEditingCvFileName(appToEdit.cvFileName);
            }
        }
    }, [editingAppId]);


    const handleEditApplication = (id) => {
        setEditingAppId(id);
        resetContextMenu();
    }

    const renderApplicationRow = (application) => {
        if (editingAppId === application.id) {
            return renderEditApplicationRow(application);
        }
        return renderDisplayApplicationRow(application);
    }

    const renderDisplayApplicationRow = (application) => {
        return (
            <>
                <td>{application.id}</td>
                <td>{formatDate(application.applicationDate)}</td>
                <td>{application.companyName}</td>
                <td>{application.positionName}</td>
                <td>
                    {application.offerLink ? (
                        <a href={application.offerLink} target='_blank'><span className='bi bi-link'></span></a>
                    ) : (
                        '')}
                </td>
                <td className='longer'>{application.status}</td>
                <td>{application.comment}</td>
                <td>{application.cvFileName}</td>
            </>
        )
    }

    const [editingDate, setEditingDate] = useState('');
    const [editingCompany, setEditingCompany] = useState('');
    const [editingPosition, setEditingPosition] = useState('');
    const [editingOfferLink, setEditingOfferLink] = useState('');
    const [editingStatus, setEditingStatus] = useState('');
    const [editingComment, setEditingComment] = useState('');
    const [editingCvFileName, setEditingCvFileName] = useState('');

    const renderEditApplicationRow = (application) => {

        const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

        return (
            <>
                <td>
                    <button className='btn btn-success'
                        onClick={() => {
                            handleSaveEditedApplication(application.id)
                            setEditingAppId(null);
                        }}>
                        <span className='bi bi-check-lg'></span>
                    </button>
                    <button className='btn btn-danger'
                        onClick={() => { setEditingAppId(null) }}>
                        <span className='bi bi-x-lg'></span>
                    </button>
                </td>
                <td>
                    <input
                        type="date"
                        className="form-control"
                        value={isoDateRegex.test(editingDate) ? editingDate.split("T")[0] : editingDate}
                        onChange={(event) => setEditingDate(event.target.value)}
                    />
                </td>
                <td>
                    <input className="form-control" type="text" name='company'
                        value={editingCompany}
                        onChange={(event) => setEditingCompany(event.target.value)} />
                </td>
                <td>
                    <input className="form-control" type="text" name='position'
                        value={editingPosition}
                        onChange={(event) => setEditingPosition(event.target.value)} />
                </td>
                <td>
                    <input className="form-control" type="text" name='offer-link'
                        value={editingOfferLink}
                        onChange={(event) => setEditingOfferLink(event.target.value)} />
                </td>
                <td>
                    <select className='form-select'
                        value={editingStatus}
                        onChange={(event) => setEditingStatus(event.target.value)}>
                        {
                            statuses.map(status =>
                                <option key={status} value={status}>{status}</option>
                            )
                        }
                    </select>
                </td>
                <td>
                    <textarea className="form-control" id="comment" name='comment' rows="1"
                        value={editingComment}
                        onChange={(event) => setEditingComment(event.target.value)} />
                </td>
                <td>
                    <input className="form-control" type="text" name='cv-file'
                        value={editingCvFileName}
                        onChange={(event) => setEditingCvFileName(event.target.value)} />
                </td>
            </>
        )
    }

    const handleSaveEditedApplication = (id) => {
        updateJobApplication(id, {
            applicationDate: editingDate,
            companyName: editingCompany,
            positionName: editingPosition,
            offerLink: editingOfferLink,
            status: editingStatus,
            comment: editingComment,
            cvFileName: editingCvFileName
        }).then((response) => {
            clearEditInputFields();
            getAllApplications();
        }).catch(error => {
            console.error(error);
        })
    }

    const clearEditInputFields = () => {
        setEditingDate('');
        setEditingCompany('');
        setEditingPosition('');
        setEditingOfferLink('');
        setEditingStatus('');
        setEditingComment('');
        setEditingCvFileName('');
    }

    const handleDeleteApplication = () => {
        const selectedApp = applications.find(app => app.selected);
        if (!selectedApp) {
            return;
        }
        deleteJobApplication(selectedApp.id).then((response) => {
            resetContextMenu();
            getAllApplications();
        }).catch(error => {
            console.error(error);
        })
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
                                        <tr
                                            key={application.id}
                                            onContextMenu={(e) => { handleOnContextMenu(e, application) }}
                                            className={`${application.selected ? "selected" : ""}`}
                                        >
                                            {renderApplicationRow(application)}
                                        </tr>
                                    )
                                }
                                <tr className='inputrow'>

                                    <td>
                                        <button type="submit" className="btn btn-success">
                                            <span className='bi bi-plus-lg'></span>
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
                    <ContextMenu
                        contextMenuRef={contextMenuRef}
                        isToggled={contextMenu.toggled}
                        positionX={contextMenu.position.x}
                        positionY={contextMenu.position.y}
                        buttons={[
                            {
                                text: "Edit",
                                icon: <span className='bi bi-pencil'></span>,
                                type: "edit",
                                onClick: () => {
                                    const selectedApp = applications.find(app => app.selected);
                                    if (selectedApp) {
                                        handleEditApplication(selectedApp.id);
                                    }
                                }
                            },
                            {
                                text: "Delete",
                                icon: <span className='bi bi-trash'></span>,
                                type: "delete",
                                onClick: () => { handleDeleteApplication() }
                            }
                        ]}
                    />
                </div>
            </div>
        </>
    )
}

export default JobApplication
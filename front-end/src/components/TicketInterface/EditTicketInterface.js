import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './editTicketInterface-styles.css';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios';

export default function TicketInterface() {
    const API_URL = process.env.REACT_APP_API_END_POINT
    const navigate = useNavigate();
    const { ticketId } = useParams();
    const [ticketInfo, setTicketInfo] = useState([]);
    const [requestorName, setRequestorName] = useState("");
    const [assigneeName, setAssigneeName] = useState("");
    const [newTime, setNewTime] = useState("");
    const [assignee_id, setAssigneeId] = useState("");
    const [status, setStatus] = useState("");
    const [notes, setNotes] = useState("");


    const requestorMapping = [
      {name: "Adam Cameron", id: 1},
      {name: "Rachita Singh", id: 2},
      {name: "Inaya Rajwani", id: 3},
      {name: "Emily Chiu", id: 4},
      {name: "Abee Allen", id: 5},
    ];
    
    useEffect(() => {
        const getTicket = () => {
            axios.post(`http://${API_URL}/get_ticket`, {
                ticket_id: ticketId,
            })
            .then((response) => {
                console.log('API response:', response.data);
                setTicketInfo(response.data.ticket);
                setAssigneeId(response.data.ticket[2]);
                setStatus(response.data.ticket[8]);
                setNotes(response.data.ticket[9]);

                getRequestorName(response.data.ticket[1]);
                getAssigneeName(response.data.ticket[2]);
                changeTime(response.data.ticket[6]);

            })
            .catch((error) => {
                console.error('Error fetching ticket:', error);
            });
        };
  
        getTicket();
    }, []);

    const getRequestorName = (userId) => {
        axios.post(`http://${API_URL}/get_user`, {
            user_id: userId,
        })
        .then((response) => {
            setRequestorName(response.data.user[1]);
        })
        .catch((error) => {
        console.log(error, 'error');
        }) 
    };

    const getAssigneeName = (userId) => {
        axios.post(`http://${API_URL}/get_user`, {
            user_id: userId,
        })
        .then((response) => {
            setAssigneeName(response.data.user[1]);
        })
        .catch((error) => {
        console.log(error, 'error');
        }) 
    };

    const changeTime = (time) => {
        setNewTime(time.slice(0, 19));
    };

    const saveEditTicketButtonClick = () => {
        axios.post(`http://${API_URL}/update_ticket`, {
            ticket_id: ticketId,
            status: status,
            assignee_id: assignee_id,
            notes: notes
        })
        navigate('/home');
    };

    const cancelEditTicketButtonClick = () => {
        navigate(`/individual-ticket/${ticketId}`);
    };

    return (
        <div className="page-background">
            <Header/>
            <div className="sidebar-container">
                <div>
                    <Sidebar/>
                </div>
                <div className="body-container">
                    <div className="ticket-background">
                        <div className="ticket-form-card">
                            <form action="" className="ticket-form">
                                <div className="ticket-header">
                                    <div className="ticket-title">
                                        Ticket Details - {ticketId}
                                    </div>
                                    <div className="buttons-container">
                                        <div className="ticket-button">
                                            <button type='submit' id='save-edit-ticket-button' onClick={saveEditTicketButtonClick}>Save</button>
                                        </div>
                                        <div className="ticket-button">
                                            <button type='submit' id='cancel-edit-ticket-button' onClick={cancelEditTicketButtonClick}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="ticket-middle-container">
                                <div className="ticket-middle-section">
                                            <label for='number'>Number</label>
                                            <input id='number' type='text' value={ticketInfo[0]} disabled/>

                                            <label for='requested-by'>Requested by</label>
                                            <input id='requested-by' type='text' value={requestorName} disabled/>

                                            <label for='assigned-to'>Assigned to</label>
                                            <select 
                                                id='assigned-to'
                                                name='assigned-to'
                                                defaultValue={assigneeName}
                                                onChange={e => setAssigneeId(e.target.value)}
                                            >
                                                {requestorMapping.map(({name, id}) => {
                                                    return <option value={id}>{name}</option>
                                                })}
                                            </select>
                                    </div>
                                    <div className="ticket-middle-section">
                                    <label for='opened'>Opened</label>
                                            <input id='opened' type='text' value={newTime} disabled/>

                                            <label for='status'>Status</label>
                                            <select 
                                                id="status" 
                                                name="status"
                                                defaultValue={ticketInfo[8]} 
                                                onChange={e => setStatus(e.target.value)}
                                            >
                                                <option value="open">Open</option>
                                                <option value="resolved">Resolved</option>
                                            </select>

                                            <label for='priority'>Priority</label>
                                            <input id='priority' type='text' value={ticketInfo[7]} disabled/>

                                            <label for='category'>Category</label>
                                            <input id='category' type='text' value={ticketInfo[5]} disabled/>
                                    </div>
                                </div>
                                <div className="ticket-last-section">
                                        <label for='shortDescription'>Short description</label>
                                        <input id='shortDescription' type='text' value={ticketInfo[4]} disabled/>
                                        
                                        <label for='notes'>Notes</label>
                                        <textarea 
                                            id='notes' 
                                            type='text' 
                                            onChange={e => setNotes(e.target.value)}
                                        />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

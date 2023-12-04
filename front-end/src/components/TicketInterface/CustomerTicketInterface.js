import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { redirect } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styles from './ticketInterface-styles.css';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

export default function CustomerTicketInterface() {
    const navigate = useNavigate();
    const { ticketId } = useParams();
    const [ticketInfo, setTicket] = useState([]);
    const [requestorName, setRequestorName] = useState("");
    const [assigneeName, setAssigneeName] = useState("");
    const [status, setStatus] = useState(0);


    useEffect(() => {
        const getTicket = () => {
            axios.post('http://localhost:5000/get_ticket', {
                ticket_id: ticketId,
            })
            .then((response) => {
                console.log('API response:', response.data);
                setTicket(response.data.ticket);

                getRequestorName(response.data.ticket[1]);
                getAssigneeName(response.data.ticket[2]);

            })
            .catch((error) => {
                console.error('Error fetching ticket:', error);
            });
        };
  
        getTicket();
    }, []);

    const getRequestorName = (userId) => {
        axios.post('http://localhost:5000/get_user', {
            user_id: userId,
        })
        .then((response) => {
            console.log(response.data.user[1])
            setRequestorName(response.data.user[1]);
        })
        .catch((error) => {
        console.log(error, 'error');
        }) 
    };

    const getAssigneeName = (userId) => {
        axios.post('http://localhost:5000/get_user', {
            user_id: userId,
        })
        .then((response) => {
            console.log(response.data.user[1])
            setAssigneeName(response.data.user[1]);
        })
        .catch((error) => {
        console.log(error, 'error');
        }) 
    };

    const closeTicketButtonClick = () => {
        window.alert("Ticket has been moved to closed state")
    };

    const editTicketButtonClick = () => {
        navigate('/edit-ticket');
    };

    const deleteTicketButtonClick = () => {
        window.alert("Ticket has now been deleted")
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
                                        {/* <div className="ticket-button">
                                            <button type='submit' onClick={() => editTicketButtonClick()}>Edit Ticket</button>
                                        </div> */}
                                        <div className="ticket-button">
                                            <button type='submit' onClick={() => deleteTicketButtonClick()}>Delete Ticket</button>
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
                                            <input id='assigned-to' type='text' value={assigneeName} disabled/>
                                    </div>
                                    <div className="ticket-middle-section">
                                            <label for='opened'>Opened</label>
                                            <input id='opened' type='datetime-local' />

                                            <label for='status'>Status</label>
                                            <input id='status' type='text' value={ticketInfo[8]} disabled/>

                                            <label for='priority'>Priority</label>
                                            <input id='priority' type='text' value={ticketInfo[7]} disabled/>
                                            {/* <select id="priority" name="priority">
                                                <option value="Low">3 - Low</option>
                                                <option value="Medium">2 - Medium</option>
                                                <option value="High">1 - High</option>
                                            </select> */}

                                            <label for='category'>Category</label>
                                            <input id='category' type='text' value={ticketInfo[5]} disabled/>
                                    </div>
                                </div>
                                <div className="ticket-last-section">
                                        <label for='shortDescription'>Short description</label>
                                        <input id='shortDescription' type='text' value={ticketInfo[4]} disabled/>

                                        <label for='notes'>Notes</label>
                                        <textarea id='notes' type='text' value={ticketInfo[9]} disabled/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

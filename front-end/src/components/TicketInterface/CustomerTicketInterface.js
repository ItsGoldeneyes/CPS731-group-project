import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { redirect } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styles from './ticketInterface-styles.css';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

export default function CustomerTicketInterface() {
    const API_URL = process.env.REACT_APP_API_END_POINT
    const navigate = useNavigate();
    const { ticketId } = useParams();
    const [ticketInfo, setTicket] = useState([]);
    const [requestorName, setRequestorName] = useState("");
    const [assigneeName, setAssigneeName] = useState("");
    const [newTime, setNewTime] = useState("");


    useEffect(() => {
        const getTicket = () => {
            axios.post(`${API_URL}/get_ticket`, {
                ticket_id: ticketId,
            })
            .then((response) => {
                console.log('API response:', response.data);
                setTicket(response.data.ticket);

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
        axios.post(`${API_URL}/get_user`, {
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
        axios.post(`${API_URL}/get_user`, {
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

    const changeTime = (time) => {
        setNewTime(time.slice(0, 19));
    };

    const closeTicketButtonClick = () => {
        console.log("close")
    };

    const editTicketButtonClick = () => {
        navigate('/edit-ticket');
    };

    const deleteTicketButtonClick = () => {
        console.log(ticketId)
        axios.post(`${API_URL}/delete_ticket`, {
            ticket_id: ticketId,
        })
        .then((response) => {
            console.log(response)
            navigate('/home');
        })
        .catch((error) => {
        console.log(error.response.data, 'error');
        }) 
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
                                            <button type='button' onClick={() => deleteTicketButtonClick()}>Delete Ticket</button>
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
                                            <input id='opened' type='text' value={newTime} disabled/>

                                            <label for='status'>Status</label>
                                            <input id='status' type='text' value={ticketInfo[8]} disabled/>

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

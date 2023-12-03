import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './createticket-styles.css';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import AvailabilityChart from '../AvailabilityChart/AvailabilityChart';

export default function CreateTicket() {
    const navigate = useNavigate();

    const cancelCreateTicketButtonClick = () => {
        navigate('/customer-dashboard');
    };

    const createTicketButtonClick = () => {
        var shortDescription = document.getElementById('create-shortDescription').value;
        var requestedBy = document.getElementById('create-requested-by').value;
        var chosenCategory = document.getElementById('create-category').value;
        var userEmail = document.getElementById('create-email').value;
        var userNotes = document.getElementById('create-notes').value;

        window.alert(shortDescription +"\n"+ 
                    requestedBy +"\n"+ 
                    chosenCategory +"\n"+ 
                    userEmail +"\n"+ 
                    userNotes
                    )
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
                            <form action="" className="create-ticket-form">
                                <div className="create-ticket-header">
                                    <div className="create-ticket-title">
                                        Create Ticket
                                    </div>
                                    <div className="create-ticket-buttons-container">
                                        <div className="ticket-button">
                                            <button id='create-ticket-button' type='submit' onClick={() => createTicketButtonClick()}>Create</button>
                                        </div>
                                        <div className="ticket-button">
                                            <button id='cancel-ticket-button' type='submit' onClick={() => cancelCreateTicketButtonClick()}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="create-ticket-input-container">
                                    <label for='create-shortDescription'>Short description</label>
                                    <input id='create-shortDescription' type='text' value="New User Ticket" required/>

                                    <label for='create-requested-by'>Requested by</label>
                                        <input id='create-requested-by' type='text' required/>

                                        <label for='create-category'>Category</label>
                                        <select id="create-category" name="category" required>
                                            <option value="" selected disabled></option>
                                            <option value="Laptop">Laptop</option>
                                            <option value="Desktop">Desktop</option>
                                            <option value="Monitor">Monitor</option>
                                            <option value="MobilePhone">Mobile Phone</option>
                                            <option value="LandlinePhone">Landline Phone</option>
                                            <option value="Printer">Printer</option>
                                            <option value="Tablet">Tablet</option>
                                        </select>

                                        <label for='create-email'>Email</label>
                                        <input id='create-email' type='text' required/>

                                        <label for='create-availability'>Availability</label>
                                        <div id='user-availability'>
                                            <AvailabilityChart/>
                                        </div>

                                        <label for='create-notes'>Notes</label>
                                        <textarea id='create-notes' type='text'/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
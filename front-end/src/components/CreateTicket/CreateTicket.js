import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { redirect } from 'react-router';
import styles from './createticket-styles.css';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import AvailabilityChart from '../AvailabilityChart/AvailabilityChart';

export default function CreateTicket() {
    const navigate = useNavigate();

    const cancelCreateTicketButtonClick = () => {
        navigate('/customer-dashboard');
    };

    const createForm = async (payload) => {
        // e.preventDefault();
        axios.post('http://localhost:5000/create_ticket', {
            title: payload.title,
            requestor_id: payload.requestor_id,
            description: payload.description,
            category: payload.category,
            priority: payload.priority,
            notes: payload.notes
        })
        .then((response) => {
          console.log(response);
          redirect('/');
    
        })
        .catch((error) => {
          console.log(error, 'error');
        })
        
    }

    const createTicketButtonClick = () => {
        var shortDescription = document.getElementById('create-shortDescription').value;
        var requestedBy = document.getElementById('create-requested-by').value;
        var customerAvailability = document.getElementById('create-availability').value;
        var chosenCategory = document.getElementById('create-category').value;
        var userEmail = document.getElementById('create-email').value;
        var userNotes = document.getElementById('create-notes').value;

        const requestorMapping = {'Adam Cameron': 1, 'Rachita Singh':2, 'Inaya Rajwani':3, 'Emily Chiu':4, 'Abee Allen':5}
        const specialtyMapping = {'Laptop':'computer', 'Desktop':'computer', 'Monitor':'computer','MobilePhone':'phone','LandlinePhone':'phone', 'Printer':'other','Tablet':'other'}
        createForm({title:shortDescription, requestor_id:requestorMapping[requestedBy], category:specialtyMapping[chosenCategory], description:userEmail, priority:"", notes:userNotes})

        window.alert(shortDescription +"\n"+ 
                    requestedBy +"\n"+ 
                    customerAvailability +"\n"+ 
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

                                <div className="create-ticket-first-container">
                                    <label for='create-shortDescription'>Short description</label>
                                    <input id='create-shortDescription' type='text' value="New User Ticket" required/>
                                </div>
                                <div className="create-ticket-middle-container">
                                    <div className="create-ticket-middle-section">
                                        <label for='create-requested-by'>Requested by</label>
                                        <input id='create-requested-by' type='text' required/>

                                        <label for='create-availability'>Availability</label>
                                        <input id='create-availability' type='text' required/>
                                    </div>
                                    <div className="create-ticket-middle-section">
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
                                    </div>
                                </div>
                                <div className="create-ticket-last-section">
                                        <label for='create-notes'>Notes</label>
                                        <textarea id='create-notes' type='text'/>
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

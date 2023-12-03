import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { redirect } from 'react-router';
import styles from './viewalltickets-styles.css';
import info_icon from '../../assets/ticket-info-icon.svg';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import TicketsTable from '../AllTicketsTable/AllTicketsTable';

export default function ViewAllTickets() {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = () => {
            axios.post('http://localhost:5000/get_user_tickets', {
                user_id: 'ella.johnson@aaier.ca', //Replace with user id variable
            })
            .then((response) => {
                console.log('API response:', response.data);

                //Set fake data
                const fakeTicketData = [
                    {
                      "ticket_id": "12345",
                      "requestor_id": "user123",
                      "assignee_id": "support456",
                      "opened_on": "2023-01-01",
                      "updated_on": "2023-01-02",
                      "priority": "High",
                      "category": "Technical Issue",
                      "description": "Cannot access the system",
                      "notes": "User reported error message on login screen.",
                    },
                    {
                      "ticket_id": "67890",
                      "requestor_id": "user456",
                      "assignee_id": "support789",
                      "opened_on": "2023-01-03",
                      "updated_on": "2023-01-04",
                      "priority": "Medium",
                      "category": "Bug Report",
                      "description": "Application crashes when clicking button X.",
                      "notes": "Issue observed on Windows operating system.",
                    },
                ];
                
                //setTickets(response.data.tickets);
                setTickets(fakeTicketData);
            })
            .catch((error) => {
                console.error('API error:', error);
            });
        };
  
        fetchTickets();
    }, []);
  
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
                            <div className="all-tickets-table-title">
                                    All Tickets 
                            </div>
                            <div>
                                <TicketsTable ticketData={tickets}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

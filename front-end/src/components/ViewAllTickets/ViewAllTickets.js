import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { redirect } from 'react-router';
import styles from './viewalltickets-styles.css';
import info_icon from '../../assets/ticket-info-icon.svg';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import TicketsTable from '../AllTicketsTable/AllTicketsTable';
import TicketsTableCustomer from '../AllTicketsTable/TicketsTableCustomer';
import getToken from '../../hooks/getToken';

export default function ViewAllTickets() {
    const API_URL = process.env.REACT_APP_API_END_POINT

    const [tickets, setTickets] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const token = getToken();
    console.log(token);

    useEffect(() => {
        const fetchTickets = () => {
            axios.post(`http://${API_URL}/get_user_tickets`, {
                user_id: token, 
            })
            .then((response) => {
                //console.log('API response:', response.data.tickets);           
                setTickets(response.data.tickets);
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
                                <TicketsTableCustomer ticketData={tickets}/> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { redirect } from 'react-router';
import styles from './viewalltickets-styles.css';
import info_icon from '../../assets/ticket-info-icon.svg';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import TicketsTable from '../AllTicketsTable/AllTicketsTable';
import TicketsTableCustomer from '../AllTicketsTable/TicketsTableCustomer';

export default function ViewAllTickets() {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = () => {
            axios.post('http://localhost:5000/get_user_tickets', {
                user_id: 6, //Replace with user id variable
            })
            .then((response) => {
                console.log('API response:', response.data);           
                setTickets(response.data.tickets);
            })
            .catch((error) => {
                console.error('API error:', error);
            });
        };

        // const getDashboardInfo = () => {
        //     axios.post('http://localhost:5000/get_user', {
        //       user_id: userId,
        //     })
        //     .then((response) => {
        //         console.log("Response", response.data.user)
        //         setUserInfo(response.data.user);
        //     })
        //     .catch((error) => {
        //       console.log(error, 'error');
        //     }) 
        //   };
  
        fetchTickets();
        // getUserInfo();
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
                                {/* <TicketsTableCustomer ticketData={tickets}/>  */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

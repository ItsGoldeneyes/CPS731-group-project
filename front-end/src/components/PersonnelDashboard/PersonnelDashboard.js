import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './personnel-dashboard-styles.css';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import TicketsTable from '../AllTicketsTable/AllTicketsTable';
import personnel_user_icon from '../../assets/personnel-dashboard-user-icon.svg';
import personnel_mail_icon from '../../assets/personnel-dashboard-mail-icon.svg';
import personnel_phone_icon from '../../assets/personnel-dashboard-phone-icon.svg';
import info_icon from '../../assets/ticket-info-icon.svg';


export default function PersonnelDashboard() {
    const userId = localStorage.getItem('token');
    const [ticket, setAllTickets] = useState([]);
    const [userInfo, setUserInfo] = useState({ name: '', email: ''});

    useEffect(() => {
        const fetchAllTickets = () => {
            axios.post('http://localhost:5000/get_all_tickets', {
            })
            .then((response) => {
                console.log('API response:', response.data);
                setAllTickets(response.data.tickets);
            })
            .catch((error) => {
                console.error('API error:', error);
            });
        };

        const getDashboardInfo = () => {
            axios.post('http://localhost:5000/get_user', {
              user_id: userId,
            })
            .then((response) => {
                const user = response.data.user;
                console.log("Response", response.data.user)
                setUserInfo({
                    name: user[1],
                    email: user[2]
                });
            })
            .catch((error) => {
              console.log(error, 'error');
            }) 
          };
  
        fetchAllTickets();
        getDashboardInfo();
    }, []);

    const dashboardAvailabilityButtonClick = () => {
        window.location.href = `/personnel-submit-availability?userId=${userId}`;
    };

    return (
        <div className="page-background">
            <Header/>
            <div className="sidebar-container">
                <div>
                    <Sidebar/>
                </div>
                <div className="body-container">
                    <div className="personnel-dashboard-background">
                        <div className="personnel-dashboard-info-card">
                            <div className="personnel-dashboard-info-title">
                                Agent Information
                            </div>
                            <div className="personnel-dashboard-info-details-container">
                                <img className="personnel_user_icon-style" src={personnel_user_icon} alt='User Icon' />
                                <div>
                                    <div id="personnel-dashboard-details-name">{userInfo.name}</div>
                                    <div>IT Specialist</div>
                                </div>
                                <div>
                                    <div className="personnel-dashboard-details-email-style">
                                        <img className="personnel_info_contact_icon" src={personnel_mail_icon} alt='Email' />
                                        <span id="personnel-dashboard-details-email">{userInfo.email}</span>
                                    </div>
                                    <div className="personnel-dashboard-details-phone-number-style">

                                    </div>
                                </div>
                                <div className="personnel-availability-button-container">
                                    <button id="dashboard-availability-button" type="button" onClick={() => dashboardAvailabilityButtonClick()}>Update Availability</button>
                                </div>
                            </div>
                        </div>
                        <div className="personnel-dashboard-tickets-card">
                            <div className="personnel-dashboard-tickets-title">
                                Tickets
                            </div>
                            <div className="personnel-dashboard-tickets-buttons">
                                    <button type="button">Assigned to me</button>
                                    <button type="button">All Tickets</button>
                            </div>
                            <div>
                                <TicketsTable ticketData={ticket}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

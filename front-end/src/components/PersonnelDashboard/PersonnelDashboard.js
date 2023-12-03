import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
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
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userId');
    console.log(userId) //This is the userId of the user logged in
    const [ticket, setAllTickets] = useState([]);

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
  
        fetchAllTickets();
    }, []);




    const dashboardAvailabilityButtonClick = () => {
        navigate('/personnel-submit-availability');
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
                                    <div id="personnel-dashboard-details-name">Jane Doe</div>
                                    <div>IT Specialist</div>
                                </div>
                                <div>
                                    <div className="personnel-dashboard-details-email-style">
                                        <img className="personnel_info_contact_icon" src={personnel_mail_icon} alt='Email' />
                                        <span id="personnel-dashboard-details-email">janedoe@aaier.com</span>
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

import React from 'react';
import styles from './viewalltickets-styles.css';
import info_icon from '../../assets/ticket-info-icon.svg';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import TicketsTable from '../AllTicketsTable/AllTicketsTable';

export default function ViewAllTickets() {
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
                            <TicketsTable/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

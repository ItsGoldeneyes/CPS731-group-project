import React from 'react'
import styles from './personnel-dashboard-styles.css';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import personnel_user_icon from '../../assets/personnel-dashboard-user-icon.svg';

export default function PersonnelDashboard() {
  return (
    <div className="personnel-dashboard-background">
        <div className="personnel-dashboard-info-card">
            <div className="personnel-dashboard-info-title">
                Agent Information
            </div>
        </div>
        <div className="personnel-dashboard-tickets-card">
            <div className="personnel-dashboard-tickets-title">
                Tickets
            </div>
        </div>
    </div>


    /*
    <div>
        <Header/>
        <div className="sidebar-container">
            <div>
                <Sidebar/>
            </div>
            <div className="body-container">
                
            </div>
        </div>
    </div>
    */
  )
}

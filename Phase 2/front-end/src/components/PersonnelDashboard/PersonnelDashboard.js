import React from 'react'
import styles from './personnel-dashboard-styles.css';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import personnel_user_icon from '../../assets/personnel-dashboard-user-icon.svg';
import personnel_mail_icon from '../../assets/personnel-dashboard-mail-icon.svg';
import personnel_phone_icon from '../../assets/personnel-dashboard-phone-icon.svg';

export default function PersonnelDashboard() {
  return (
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
                        <img className="personnel_info_contact_icon" src={personnel_phone_icon} alt='Phone' />
                        <span id="personnel-dashboard-details-phone-number">(416) 123-4567</span>
                    </div>
                </div>
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

import React from 'react';
import styles from './customer-dashboard-styles.css';
import Header from '../Header/Header';
import compose_icon from '../../assets/dashboard-customer-compose.svg';
import inbox_icon from '../../assets/dashboard-customer-inbox.svg';

export default function CustomerDashboard() {
  return (
    <div className="customer-dashboard-background">
        <Header/>
        <div className="customer-dashboard-container">
            <div className="customer-title-header">
                IT Help Desk
            </div>
            <div className="customer-options-card">
                <div className="customer-first-option">
                    <img className="customer-icons" src={compose_icon} alt='Compose' />
                    <div className="customer-option-text-container">
                        <span className="options-titlecase">Create Ticket</span>
                        Request IT services for issues you are facing
                    </div>
                </div>
                <div className="customer-second-option">
                    <img className="customer-icons" src={inbox_icon} alt='Inbox' />
                    <div className="customer-option-text-container">
                        <span className="options-titlecase">View My Tickets</span>
                        Get a detailed list of all your open tickets
                    </div>
                </div>
            </div>
            <div className="customer-faq-card">
                FAQ
            </div>
        </div>
    </div>
  )
}

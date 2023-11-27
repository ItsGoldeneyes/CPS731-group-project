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
                        <div className="options-titlecase">Create Ticket</div>
                        Request IT services for issues you are facing
                    </div>
                </div>
                <div className="customer-second-option">
                    <img className="customer-icons" src={inbox_icon} alt='Inbox' />
                    <div className="customer-option-text-container">
                        <div className="options-titlecase">View My Tickets</div>
                        Get a detailed list of all your open tickets
                    </div>
                </div>
            </div>
            <div className="customer-faq-card">
                <span className="faq-titlecase">FAQ</span>
                <div className="customer-faq-card-container">
                    <div className="customer-faq-card-section">
                        <div className="faq-questioncase">
                            How will I know if there are any changes to my appointment?
                        </div>  
                        <div>
                            You will receive a notification in your email if any changes 
                            have been made to your appointment after it has been created. 
                        </div>
                    </div>
                    <div className="customer-faq-card-section">
                        <div className="faq-questioncase">
                            <div>I am not able to make my appointment.</div>
                            <div>Can I reschedule?</div>
                        </div>
                        <div>
                            Yes, if you click on your ticket in ‘View My Tickets’, you will 
                            have the option to edit ticket details.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './customer-dashboard-styles.css';
import Header from '../Header/Header';
import compose_icon from '../../assets/dashboard-customer-compose.svg';
import inbox_icon from '../../assets/dashboard-customer-inbox.svg';

export default function CustomerDashboard() {
    const navigate = useNavigate();

    const createTicketButtonClick = () => {
        navigate('/create-ticket');
    };

    const viewAllTicketsButtonClick = () => {
        navigate('/view-all-tickets');
    };

  return (
    <div className="customer-dashboard-background">
        <Header/>
        <div className="customer-dashboard-container">
            <div className="customer-title-header">
                IT Help Desk
            </div>
            <div className="customer-options-card">
                <button className="customer-first-option" type='button' onClick={() => createTicketButtonClick()}>
                    <img className="customer-icons" src={compose_icon} alt='Compose' />
                    <div className="customer-option-text-container">
                        <div className="options-titlecase">Create Ticket</div>
                        Request IT services for issues you are facing
                    </div>
                </button>
                <button className="customer-second-option" type='button' onClick={() => viewAllTicketsButtonClick()}>
                    <img className="customer-icons" src={inbox_icon} alt='Inbox' />
                    <div className="customer-option-text-container">
                        <div className="options-titlecase">View My Tickets</div>
                        Get a detailed list of all your open tickets
                    </div>
                </button>
            </div>
            <div className="customer-faq-card">
                <span className="faq-titlecase">FAQ</span>
                <div className="customer-faq-card-container">
                    <div className="customer-faq-card-section">
                        <div className="faq-questioncase">
                            How do I create a ticket?
                        </div>  
                        <div>
                            If you click the 'Create Ticket' button, you will be redirected to a form to fill out about the issue you are facing.
                        </div>
                    </div>
                    <div className="customer-faq-card-section">
                        <div className="faq-questioncase">
                            <div>How can I see all of my current tickets?</div>
                        </div>
                        <div>
                            If you click the 'View My Tickets' button, you can see any open tickets that you currently have.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
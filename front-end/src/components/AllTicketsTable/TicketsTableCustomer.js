import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './all-tickets-table.css';
import info_icon from '../../assets/ticket-info-icon.svg';
import whitespace from '../../assets/tickets-table-placeholder.svg';

export default function TicketsTableCustomer({ ticketData }) {
    const API_URL = process.env.REACT_APP_API_END_POINT

    const [requestorNames, setTicketRequestorNames] = useState([]);
    const [assigneeNames, setTicketAssigneeNames] = useState([]);

    const getName = (userId) => {
        return axios.post(`${API_URL}/get_user`, {
            user_id: userId,
        })
            .then((response) => response.data.user[1])
            .catch((error) => {
            console.error('API error:', error);
            return 'N/A';
        });
    };
    
    const fetchNames = () => {
        const requestorPromises = ticketData.map((i) => getName(i[1]));
        const assigneePromises = ticketData.map((i) => getName(i[2]));
        
        Promise.all(requestorPromises).then((resolvedNames) => {
            setTicketRequestorNames(resolvedNames);
        });
        Promise.all(assigneePromises).then((resolvedNames) => {
            setTicketAssigneeNames(resolvedNames);
    });
    };
    
    useEffect(() => {
        fetchNames();
    }, [ticketData]);

    return (
        <div>
            <div className="personnel-dashboard-tickets-table">
                <table className="all-tickets-table-component">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Number</th>
                            <th>Description</th>
                            <th>Requested By</th>
                            <th>Category</th>
                            <th>Assigned To</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ticketData.map((ticket, index) => (
                            <tr key={index}>
                                <td><img src={info_icon} alt='Notifications' /></td>
                                <td><Link to={`/individual-ticket-customer/${ticket[0]}`}>{ticket[0]}</Link></td>
                                <td>{ticket[4]}</td>
                                <td>{requestorNames[index]}</td>
                                <td>{ticket[5]}</td>
                                <td>{assigneeNames[index]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

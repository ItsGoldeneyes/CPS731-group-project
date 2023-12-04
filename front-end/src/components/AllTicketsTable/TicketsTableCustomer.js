import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './all-tickets-table.css';
import info_icon from '../../assets/ticket-info-icon.svg';
import whitespace from '../../assets/tickets-table-placeholder.svg';

export default function TicketsTableCustomer({ ticketData }) {
    console.log(ticketData)

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
                                <td><Link to={`/individual-ticket/${ticket[0]}`}>{ticket[0]}</Link></td>
                                <td>{ticket[4]}</td>
                                <td>{ticket[2]}</td>
                                <td>{ticket[5]}</td>
                                <td>{ticket[10]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

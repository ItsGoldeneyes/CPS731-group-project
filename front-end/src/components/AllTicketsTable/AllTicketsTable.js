import React from 'react'
import { Link } from 'react-router-dom';
import styles from './all-tickets-table.css';
import info_icon from '../../assets/ticket-info-icon.svg';
import whitespace from '../../assets/tickets-table-placeholder.svg';

export default function AllTicketsTable({ ticketData }) {
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
                        <td><Link to={`/individual-ticket/${ticket.ticket_id}`}>{ticket.ticket_id}</Link></td>
                        <td>{ticket.description}</td>
                        <td>{ticket.requestor_id}</td>
                        <td>{ticket.category}</td>
                        <td>{ticket.assignee_id}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

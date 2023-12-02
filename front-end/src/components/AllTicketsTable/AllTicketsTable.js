import React from 'react'
import { Link } from 'react-router-dom';
import styles from './all-tickets-table.css';
import info_icon from '../../assets/ticket-info-icon.svg';
import whitespace from '../../assets/tickets-table-placeholder.svg';

export default function AllTicketsTable() {
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
                    <tr>
                        <td><img src={info_icon} alt='Notifications' /></td>
                        <td><Link to='/individual-ticket'>TCKT001</Link></td>
                        <td>This is a sample description that is quite long</td>
                        <td>John Doe</td>
                        <td>Software</td>
                        <td>Jane Smith</td>
                    </tr>
                    <tr>
                        <td><img src={info_icon} alt='Notifications' /></td>
                        <td><Link to='/individual-ticket'>TCKT002</Link></td>
                        <td>Short Description</td>
                        <td>Alice Johnson</td>
                        <td>Hardware</td>
                        <td>Bob Williams</td>
                    </tr>
                    <tr>
                        <td class="leftAlign"><img src={info_icon} alt='Notifications' /></td>
                        <td><Link to='/individual-ticket'>TCKT003</Link></td>
                        <td>Another Description</td>
                        <td>Charlie Brown</td>
                        <td>Network</td>
                        <td>Diana Miller</td>
                    </tr>
                    <tr>
                        <td><img src={info_icon} alt='Notifications' /></td>
                        <td><Link to='/individual-ticket'>TCKT004</Link></td>
                        <td>Lorem Ipsum</td>
                        <td>Eve Davis</td>
                        <td>Database</td>
                        <td>Frank Wilson</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

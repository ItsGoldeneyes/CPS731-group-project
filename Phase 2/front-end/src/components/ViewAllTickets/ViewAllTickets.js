import React from 'react';
import styles from './viewalltickets-styles.css';

export default function ViewAllTickets() {
  return (
    <div className="ticket-background">
        <div className="ticket-form-card">
            <div className="all-tickets-table-title">
                    All Tickets 
            </div>
            <div>
                <table id="all-tickets-table">
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Description</th>
                            <th>Requested By</th>
                            <th>Category</th>
                            <th>Assigned To</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><a href="https://example.com/ticket/1">TCKT001</a></td>
                            <td>This is a sample description that is quite long</td>
                            <td>John Doe</td>
                            <td>Software</td>
                            <td>Jane Smith</td>
                        </tr>
                        <tr>
                            <td><a href="https://example.com/ticket/2">TCKT002</a></td>
                            <td>Short Description</td>
                            <td>Alice Johnson</td>
                            <td>Hardware</td>
                            <td>Bob Williams</td>
                        </tr>
                        <tr>
                            <td><a href="https://example.com/ticket/3">TCKT003</a></td>
                            <td>Another Description</td>
                            <td>Charlie Brown</td>
                            <td>Network</td>
                            <td>Diana Miller</td>
                        </tr>
                        <tr>
                            <td><a href="https://example.com/ticket/4">TCKT004</a></td>
                            <td>Lorem Ipsum</td>
                            <td>Eve Davis</td>
                            <td>Database</td>
                            <td>Frank Wilson</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

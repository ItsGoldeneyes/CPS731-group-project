import React from 'react';
import styles from './ticketInterface-styles.css';

export default function TicketInterface() {
  return (
    <div className="ticket-background">
        <div className="ticket-form-card">
            <form action="" className="ticket-form">
                <div className="ticket-header">
                    <div className="ticket-title">
                        Ticket Details - INC09394
                    </div>
                    <div className="buttons-container">
                        <div className="ticket-button">
                            <button type='submit'>Close Ticket</button>
                        </div>
                        <div className="ticket-button">
                            <button type='submit'>Edit Ticket</button>
                        </div>
                        <div className="ticket-button">
                            <button type='submit'>Delete Ticket</button>
                        </div>
                    </div>
                </div>
                <div className="ticket-middle-section">
                    <div>
                        <div>
                            <label for='number'>Number</label>
                            <input id='number' type='text' />
                        </div>
                        <div>
                            <label for='requested-by'>Requested by</label>
                            <input id='requested-by' type='text' />
                        </div>
                        <div>
                            <label for='assigned-to'>Assigned to</label>
                            <input id='assigned-to' type='text' />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label for='opened'>Opened</label>
                            <input id='opened' type='datetime-local' />
                        </div>
                        <div>
                            <label for='updated'>Updated</label>
                            <input id='updated' type='datetime-local' />
                        </div>
                        <div>
                            <label for='priority'>Priority</label>
                            <select id="priority" name="priority">
                                <option value="Low">3 - Low</option>
                                <option value="Medium">2 - Medium</option>
                                <option value="High">1 - High</option>
                            </select>
                        </div>
                        <div>
                            <label for='category'>Category</label>
                            <select id="category" name="category">
                                <option value="" selected disabled></option>
                                <option value="Laptop">Laptop</option>
                                <option value="Desktop">Desktop</option>
                                <option value="Monitor">Monitor</option>
                                <option value="MobilePhone">Mobile Phone</option>
                                <option value="LandlinePhone">Landline Phone</option>
                                <option value="Printer">Printer</option>
                                <option value="Tablet">Tablet</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="ticket-last-section">
                    
                </div>
            </form>
        </div>
    </div>
  )
}

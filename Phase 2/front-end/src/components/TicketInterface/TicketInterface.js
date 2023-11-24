import React from 'react';
import styles from './ticketInterface-styles.css';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

export default function TicketInterface() {
  return (
    <div>
        <Header/>
        <div className="sidebar-container">
            <div>
                <Sidebar/>
            </div>
            <div className="body-container">
                <div className="ticket-background">
                    <div className="ticket-form-card">
                        <form action="" className="ticket-form">
                            <div className="ticket-header">
                                <div className="ticket-title">
                                    Ticket Details - <span id="ticketNumber">INC09394</span>
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
                            <div className="ticket-middle-container">
                                <div className="ticket-middle-section">
                                        <label for='number'>Number</label>
                                        <input id='number' type='text' />

                                        <label for='requested-by'>Requested by</label>
                                        <input id='requested-by' type='text' />

                                        <label for='assigned-to'>Assigned to</label>
                                        <input id='assigned-to' type='text' />
                                </div>
                                <div className="ticket-middle-section">
                                        <label for='opened'>Opened</label>
                                        <input id='opened' type='datetime-local' />

                                        <label for='status'>Status</label>
                                        <select id="status" name="status" >
                                            <option value="Waiting-to-be-assigned">Waiting to be assigned</option>
                                            <option value="In-progress">In progress</option>
                                            <option value="Complete">Complete</option>
                                        </select>

                                        <label for='priority'>Priority</label>
                                        <select id="priority" name="priority">
                                            <option value="Low">3 - Low</option>
                                            <option value="Medium">2 - Medium</option>
                                            <option value="High">1 - High</option>
                                        </select>

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
                            <div className="ticket-last-section">
                                    <label for='shortDescription'>Short description</label>
                                    <input id='shortDescription' type='text' />
                                    <label for='notes'>Notes</label>
                                    <input id='notes' type='text' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

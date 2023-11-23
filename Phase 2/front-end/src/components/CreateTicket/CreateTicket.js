import React from 'react';
import styles from './createticket-styles.css';

export default function CreateTicket() {
  return (
    <div className="ticket-background">
        <div className="ticket-form-card">
            <form action="" className="create-ticket-form">
                <div className="create-ticket-header">
                    <div className="create-ticket-title">
                        Create Ticket
                    </div>
                    <div className="create-ticket-buttons-container">
                        <div className="ticket-button">
                            <button id='create-ticket-button' type='submit'>Create</button>
                        </div>
                        <div className="ticket-button">
                            <button id='cancel-ticket-button' type='submit'>Cancel</button>
                        </div>
                    </div>
                </div>
                <div className="create-ticket-first-container">
                    <label for='create-shortDescription'>Short description</label>
                    <input id='create-shortDescription' type='text' />
                </div>
                <div className="create-ticket-middle-container">
                    <div className="create-ticket-middle-section">
                        <label for='create-requested-by'>Requested by</label>
                        <input id='create-requested-by' type='text' />

                        <label for='create-availability'>Availability</label>
                        <input id='create-availability' type='text' />
                    </div>
                    <div className="create-ticket-middle-section">
                        <label for='create-category'>Category</label>
                        <select id="create-category" name="category">
                            <option value="" selected disabled></option>
                            <option value="Laptop">Laptop</option>
                            <option value="Desktop">Desktop</option>
                            <option value="Monitor">Monitor</option>
                            <option value="MobilePhone">Mobile Phone</option>
                            <option value="LandlinePhone">Landline Phone</option>
                            <option value="Printer">Printer</option>
                            <option value="Tablet">Tablet</option>
                        </select>

                        <label for='create-email'>Email</label>
                        <input id='create-email' type='text' />
                    </div>
                </div>
                <div className="create-ticket-last-section">
                        <label for='create-notes'>Notes</label>
                        <input id='create-notes' type='text' />
                </div>
            </form>
        </div>
    </div>
  )
}

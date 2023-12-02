import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import TicketInterface from '../TicketInterface/TicketInterface';
import CreateTicket from '../CreateTicket/CreateTicket';
import ViewAllTickets from '../ViewAllTickets/ViewAllTickets';
import CustomerDashboard from '../CustomerDashboard/CustomerDashboard';
import PersonnelDashboard from '../PersonnelDashboard/PersonnelDashboard';
import PersonnelSubmitAvailability from '../PersonnelDashboard/PersonnelSubmitAvailability';
import AllTicketsTable from '../AllTicketsTable/AllTicketsTable';
import AvailabilityChart from '../AvailabilityChart/AvailabilityChart';

function App() {
  return (
    <div className="wrapper">
      {/* <h1>Hello World!</h1> */}
      <Router>
        <Routes>
          <Route path='/' element={<CreateTicket />} />
          <Route path='/customer-dashboard' element={<CustomerDashboard />} />
          <Route path='/personnel-dashboard' element={<PersonnelDashboard />} />
          <Route path='/personnel-submit-availability' element={<PersonnelSubmitAvailability />} />
          <Route path='/create-ticket' element={<CreateTicket />} />
          <Route path='/view-all-tickets' element={<ViewAllTickets />} />
          <Route path='/individual-ticket' element={<TicketInterface />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

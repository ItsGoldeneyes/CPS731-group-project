import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../Login/Login';
import TicketInterface from '../TicketInterface/TicketInterface';
import EditTicketInterface from '../TicketInterface/EditTicketInterface';
import CreateTicket from '../CreateTicket/CreateTicket';
import ViewAllTickets from '../ViewAllTickets/ViewAllTickets';
import CustomerDashboard from '../CustomerDashboard/CustomerDashboard';
import PersonnelDashboard from '../PersonnelDashboard/PersonnelDashboard';
import PersonnelSubmitAvailability from '../PersonnelDashboard/PersonnelSubmitAvailability';
import AllTicketsTable from '../AllTicketsTable/AllTicketsTable';
import AvailabilityChart from '../AvailabilityChart/AvailabilityChart';
import getToken from '../../hooks/getToken';

function App() {
  const [ userType, setUserType ] = useState();
  const user_id = getToken();
  const ADMIN = 'admin';
  const USER = 'user';

  if(!user_id) {
    return <Login />
  }

  // want to try setting user type in Login and grab user type from localStorage here to optimize performance
  if(user_id) {
    axios.post('http://localhost:5000/get_user', {
      user_id: user_id,
    })
    .then((response) => {
      const user_level = response.data.user[3];
      setUserType(user_level);
      localStorage.setItem("user", JSON.stringify(user_level));
    })
    .catch((error) => {
      console.log(error, 'error');
    }) 
  }

  return (
    <div className="wrapper">
      <Router>
        <Routes>
          {userType === ADMIN &&
            <>
              <Route path='/' element={<PersonnelDashboard />} />
              <Route path='/home' element={<PersonnelDashboard />} />
            </>
          }
          {userType === USER &&
            <>
              <Route path='/' element={<CustomerDashboard />} />
              <Route path='/home' element={<CustomerDashboard />} />
            </>
          }
          <Route path='/personnel-submit-availability' element={<PersonnelSubmitAvailability />} />
          <Route path='/create-ticket' element={<CreateTicket />} />
          <Route path='/view-all-tickets' element={<ViewAllTickets />} />
          <Route path="/individual-ticket/:ticketId" element={<TicketInterface />} />
          <Route path='/edit-ticket' element={<EditTicketInterface />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

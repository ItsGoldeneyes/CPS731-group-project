import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import TicketInterface from '../TicketInterface/TicketInterface';
import CreateTicket from '../CreateTicket/CreateTicket';
import ViewAllTickets from '../ViewAllTickets/ViewAllTickets';
import CustomerDashboard from '../CustomerDashboard/CustomerDashboard';
import PersonnelDashboard from '../PersonnelDashboard/PersonnelDashboard';

function App() {
  return (
    <div className="wrapper">
      {/* <h1>Hello World!</h1> */}
      <Login />
      <BrowserRouter>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

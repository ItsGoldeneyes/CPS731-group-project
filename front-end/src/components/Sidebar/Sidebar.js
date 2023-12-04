import React from 'react'
import './sidebar-styles.css';

export default function Sidebar() {

  const logout = () => {
    localStorage.removeItem('user_id')
    window.location.href = '/'
  }

  return (
    <div className="sidebar-element">
        <div className="sidebar-icons-container"> 
            <button className="sidebar-home-icon-style" type='button' onClick={() => window.location.href='/home'} alt='Home Button'></button>
            <button className="sidebar-list-icon-style" type='button' onClick={() => window.location.href='/view-all-tickets'} alt='List Tickets'></button>
            <button className="sidebar-logout-icon-style" type='button' onClick={logout} alt='Logout'></button>
        </div>
    </div>
  )
}

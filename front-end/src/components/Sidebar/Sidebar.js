import React from 'react'
import './sidebar-styles.css';

export default function Sidebar() {
  return (
    <div className="sidebar-element">
        <div className="sidebar-icons-container"> 
            <button className="sidebar-home-icon-style" type='button' onClick={() => window.location.href='/home'} alt='Home Button'></button>
            <button className="sidebar-list-icon-style" type='button' onClick={() => window.location.href='/view-all-tickets'} alt='List Tickets'></button>
        </div>
    </div>
  )
}

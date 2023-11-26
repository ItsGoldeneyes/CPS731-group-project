import React from 'react'
import styles from './sidebar-styles.css';
import home_icon from '../../assets/sidebar-home-icon.svg';
import inbox_icon from '../../assets/sidebar-inbox-icon.svg';
import list_icon from '../../assets/sidebar-list-icon.svg';

export default function Sidebar() {
  return (
    <div className="sidebar-container">
        <div className="sidebar-element">
            <div className="sidebar-icons-container"> 
                <img className="sidebar-icon-style" src={home_icon} alt='FAQ' />
                <img className="sidebar-icon-style" src={inbox_icon} alt='Notifications' />
                <img className="sidebar-icon-style" src={list_icon} alt='User Icon' />
            </div>
        </div>
        <div className="body-container">
            
        </div>
    </div>
  )
}

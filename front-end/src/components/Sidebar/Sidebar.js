import React from 'react'
import styles from './sidebar-styles.css';
import home_icon from '../../assets/sidebar-home-icon.svg';
import inbox_icon from '../../assets/sidebar-inbox-icon.svg';
import list_icon from '../../assets/sidebar-list-icon.svg';

export default function Sidebar() {
  return (
    <div className="sidebar-element">
        <div className="sidebar-icons-container"> 
            <button className="sidebar-home-icon-style" type='button' alt='FAQ'></button>
            <button className="sidebar-inbox-icon-style" type='button' alt='Notifications'></button>
            <button className="sidebar-list-icon-style" type='button' alt='User Icon'></button>
        </div>
    </div>
  )
}

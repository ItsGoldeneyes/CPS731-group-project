import React from 'react';
import styles from './header-styles.css';
import Logo from '../../assets/Logo.svg';
import help_icon from '../../assets/header-help-icon.svg';
import notification_icon from '../../assets/header-notification-icon.svg';
import user_icon from '../../assets/header-user-icon.svg';

export default function Header() {
  return (
    <div className="header-container">
        <div className="logo-name-container"> 
            <img className="logo-resize" src={Logo} alt='AAIER Corporation' />
        </div>
        <div className="header-icons-container"> 
            <button className="header-help-icon-style" type='button' alt='Help'></button>
            <button className="header-notifications-icon-style" type='button' alt='Notifications'></button>
            <button className="header-user-icon-style" type='button' alt='User Icon'></button>
        </div>
    </div>
  )
}

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
            <img className="header-icon-style" src={help_icon} alt='FAQ' />
            <img className="header-icon-style" src={notification_icon} alt='Notifications' />
            <img className="header-icon-style" src={user_icon} alt='User Icon' />
        </div>
    </div>
  )
}

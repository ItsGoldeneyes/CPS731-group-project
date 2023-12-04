import React from 'react';
import './header-styles.css';
import Logo from '../../assets/Logo.svg';

export default function Header() {
  return (
    <div className="header-container">
        <div className="logo-name-container" onClick={() => window.location.href='/home'}> 
            <img className="logo-resize" src={Logo} alt='AAIER Corporation' />
        </div>
        <div className="header-icons-container"> 
            <button className="header-user-icon-style" type='button' alt='User Icon'></button>
        </div>
    </div>
  )
}

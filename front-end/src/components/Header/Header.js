import React, { useEffect, useState } from 'react';
import './header-styles.css';
import Logo from '../../assets/Logo.svg';

export default function Header() {
  const [userType, setUserType] = useState();
  const USER = 'user'

  useEffect(() => {
    const user = localStorage.getItem('user');
    setUserType(JSON.parse(user));
  }, [])

  const logout = () => {
    localStorage.removeItem('user_id')
    window.location.href = '/'
  }

  return (
    <div className="header-container">
        <div className="logo-name-container" onClick={() => window.location.href='/home'}> 
            <img className="logo-resize" src={Logo} alt='AAIER Corporation' />
        </div>
        <div className="header-icons-container">
            {userType === USER && window.location.pathname === '/home' && <button className="header-logout-icon-style" type='button' onClick={logout} alt='Logout'></button>} 
            <button className="header-user-icon-style" type='button' alt='User Icon'></button>
        </div>
    </div>
  )
}

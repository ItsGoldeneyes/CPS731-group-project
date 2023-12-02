import React, { useState } from 'react';
import styles from './styles.css';
import Logo from '../../assets/Logo.svg';

export default function Login() {

    return(
      <div className="login-container">
        <div className="company-logo">
          <img src={Logo} alt='AAIER Corporation' />
        </div>
        <div className="login-form-card">
          <form action="" className="login-form">
            <div className="input-control">
              <label for='username'>
                Username
              </label>
              <input id='username' type='text' />
            </div>
            <div className="input-control">
              <label for='password'>
                Password
              </label>
              <input id='password' type='text' />
            </div>
            <div className="login-button">
              <button type='submit' >Login</button>
            </div>
          </form>
        </div>
      </div>
    );
}
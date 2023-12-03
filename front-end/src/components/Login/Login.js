import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { redirect } from 'react-router';
import './styles.css';
import Logo from '../../assets/Logo.svg';

export default function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async e => {
    e.preventDefault();
    axios.post('http://localhost:5000/login', {
      username: username,
      password: password
    })
    .then((response) => {
      console.log(response);
      setToken(response.data.access_token);
      redirect('/');

    })
    .catch((error) => {
      console.log(error, 'error');
    })
    
  }

  return(
    <div className="login-container">
      <div className="company-logo">
        <img src={Logo} alt='AAIER Corporation' />
      </div>
      <div className="login-form-card">
        <form className="login-form">
          <div className="input-control">
            <label htmlFor='username'>
              Username
            </label>
            <input 
              id='username' 
              type='text' 
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="input-control">
            <label htmlFor='password'>
              Password
            </label>
            <input 
              id='password' 
              type='text' 
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="login-button">
            <button type='submit' onClick={loginUser}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
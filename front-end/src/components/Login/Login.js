import React, { useState } from 'react';
import { redirect } from 'react-router';
import axios from 'axios';
import PropTypes from 'prop-types';
import './styles.css';
import Logo from '../../assets/Logo.svg';

export default function Login({ setToken, setUserId }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const loginUser = async e => {
    e.preventDefault();
    axios.post('http://localhost:5000/login', {
      username: username,
      password: password
    })
    .then((response) => {
      setToken(response.data.access_token);
      setUserId(response.data.user_id)
      //redirect('/');

      //Call another subroutine to get the user details
      getUserDetails(response.data.user_id);

    })
    .catch((error) => {
      console.log(error, 'error');
    }) 
  }

  const getUserDetails = (userId) => {
    axios.post('http://localhost:5000/get_user', {
      user_id: userId,
    })
    .then((response) => {
      const user_level = response.data.user[3];
      setUserData(response.data.user);
      
      //Redirect the user depending on their status
      if (user_level === 'admin') {
        console.log("navigate to admin dash")
        //navigate('/personnel-dashboard');
      } else {
        console.log("navigate to user dash")
        //navigate('/customer-dashboard');
      }
    })
    .catch((error) => {
      console.log(error, 'error');
    }) 
  };

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
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './personnel-availability-styles.css';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import personnel_user_icon from '../../assets/personnel-dashboard-user-icon.svg';
import personnel_mail_icon from '../../assets/personnel-dashboard-mail-icon.svg';
import personnel_phone_icon from '../../assets/personnel-dashboard-phone-icon.svg';
import info_icon from '../../assets/ticket-info-icon.svg';
import getToken from '../../hooks/getToken';

export default function PersonnelSubmitAvailability() {
    const API_URL = process.env.REACT_APP_API_END_POINT
    const userId = getToken();
    const [userInfo, setUserInfo] = useState([]);
    
    const navigate = useNavigate();
    const [selectedCells, setSelectedCells] = useState([]);
    const possibleTimes = ["9 am", "10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm"];

    useEffect(() => {
        const getDashboardInfo = () => {
            axios.post(`http://${API_URL}/get_user`, {
              user_id: userId,
            })
            .then((response) => {
                console.log("Response", response.data.user)
                setUserInfo(response.data.user);
            })
            .catch((error) => {
              console.log(error, 'error');
            }) 
          };
        getDashboardInfo();
    }, []);
  
    const cellClickEvent = (day, time) => {
      const cell = { day, time };
  
      // Check if cell is in the selectedCell list
      const isSelected = selectedCells.some(
        (selectedCell) => selectedCell.day === cell.day && selectedCell.time === cell.time
      );
  
      if (isSelected) {
        // If selected, remove from the list
        setSelectedCells((prevSelectedCells) =>
          prevSelectedCells.filter(
            (selectedCell) => !(selectedCell.day === cell.day && selectedCell.time === cell.time)
          )
        );
      } else {
        // If not selected, add to the list
        setSelectedCells((prevSelectedCells) => [...prevSelectedCells, cell]);
      }
    };

    const submitPersonnelAvailability = () => {
        // Map selected cells to cron strings
        const cronStrings = selectedCells.map((cell) => {
          const dayOfWeek = cell.day;
          const hour = cell.time.split(' ')[0];
          return `0 ${hour} * * ${dayOfWeek}`;
        });
      
        // Send cronstrings
        console.log(cronStrings);

        //Go back to homepage
        window.location.href = `/personnel-dashboard?userId=${userId}`;
    };

    const cancelAvailabilityButtonClick = () => {
        //navigate('/personnel-dashboard');
        window.location.href = `/personnel-dashboard?userId=${userId}`;
    };


    return (
        <div className="page-background-availability">
            <Header/>
            <div className="sidebar-container">
                <div>
                    <Sidebar/>
                </div>
                <div className="body-container">
                    <div className="personnel-dashboard-background">
                        <div className="personnel-dashboard-info-card">
                            <div className="personnel-dashboard-info-title">
                                Agent Information
                            </div>
                            <div className="personnel-dashboard-info-details-container">
                                <img className="personnel_user_icon-style" src={personnel_user_icon} alt='User Icon' />
                                <div>
                                    <div id="personnel-dashboard-details-name">{userInfo[1]}</div>
                                    <div>IT Specialist</div>
                                </div>
                                <div>
                                    <div className="personnel-dashboard-details-email-style">
                                        <img className="personnel_info_contact_icon" src={personnel_mail_icon} alt='Email' />
                                        <span id="personnel-dashboard-details-email">{userInfo[2]}</span>
                                    </div>
                                    <div className="personnel-dashboard-details-phone-number-style">

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="personnel-submit-availability-card">
                            <div className="personnel-dashboard-availability-header-container">
                                <div className="personnel-dashboard-availability-title">
                                    Submit Weekly Availability
                                </div>
                                <div className="availability-buttons-container">
                                    <div className="availability-button">
                                        <button id="availability-update-button" type='button' onClick={() => submitPersonnelAvailability()}>Update</button>
                                    </div>
                                    <div className="availability-button">
                                        <button id="availability-cancel-button" type='button' onClick={() => cancelAvailabilityButtonClick()}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                            <div className="personnel-dashboard-availability-table">
                                <table className="availabilityTable">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Mon</th>
                                            <th>Tues</th>
                                            <th>Wed</th>
                                            <th>Thurs</th>
                                            <th>Fri</th>
                                        </tr>
                                    </thead>
                                    <tbody id="availabilityBody">
                                        {possibleTimes.map((time, index) => (
                                        <tr key={time}>
                                            <td>{time}</td>
                                            {[1, 2, 3, 4, 5].map((day) => (
                                                <td
                                                key={`${day}-${time}`}
                                                className={selectedCells.some(
                                                    (selectedCell) => selectedCell.day === day && selectedCell.time === time
                                                ) ? 'selected' : ''}
                                                onClick={() => cellClickEvent(day, time)}
                                                ></td>
                                            ))}
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

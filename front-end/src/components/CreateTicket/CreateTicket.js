import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './createticket-styles.css';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import AvailabilityChart from '../AvailabilityChart/AvailabilityChart';
import getToken from '../../hooks/getToken';


export default function CreateTicket() {
  const API_URL = process.env.REACT_APP_API_END_POINT

//   const [userInfo, setUserInfo] = useState({ name: '', email: ''});
  const userId = getToken();

//   useEffect(() => {
//     const getUserInfo = () => {
//         axios.post(`${API_URL}/get_user`, {
//           user_id: userId,
//         })
//         .then((response) => {
//             const user = response.data.user;
//             console.log("Response", response.data.user)
//             setUserInfo({
//                 name: user[1],
//                 email: user[2]
//             });
//         })
//         .catch((error) => {
//           console.log(error, 'error');
//         }) 
//       };

//       getUserInfo();
//   }, []);

//   console.log(userInfo);

  const navigate = useNavigate();

  const cancelCreateTicketButtonClick = () => {
    navigate("/home");
  };

  const createForm = async (payload) => {
    console.log('payload', payload);
    axios
      .post(`${API_URL}/create_ticket`, {
        title: payload.title,
        requestor_id: payload.requestor_id,
        description: payload.description,
        category: payload.category,
        priority: payload.priority,
        notes: payload.notes,
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  const setSchedule = async() => {
    // Map selected cells to cron strings
    const cronStrings = selectedCells.map((cell) => {
      const dayOfWeek = cell.day;
      const hour = cell.time.split(' ')[0];
      return `0 ${hour} * * ${dayOfWeek}`;
    });
  
    // Send cronstrings
    console.log(cronStrings);

    axios.post(`${API_URL}/set_user_schedule`, {
        user_id: userId,
        schedule: cronStrings
    })
        .then((response) => response)
        .catch((error) => {
        console.error('API error:', error);
        return 'N/A';
    });
  }

  const [selectedCells, setSelectedCells] = React.useState([]);
  const possibleTimes = [
    "9 am",
    "10 am",
    "11 am",
    "12 pm",
    "1 pm",
    "2 pm",
    "3 pm",
    "4 pm",
    "5 pm",
  ];

  const cellClickEvent = (day, time) => {
    const cell = { day, time };

    // Check if cell is in the selectedCell list
    const isSelected = selectedCells.some(
      (selectedCell) =>
        selectedCell.day === cell.day && selectedCell.time === cell.time
    );

    if (isSelected) {
      // If selected, remove from the list
      setSelectedCells((prevSelectedCells) =>
        prevSelectedCells.filter(
          (selectedCell) =>
            !(selectedCell.day === cell.day && selectedCell.time === cell.time)
        )
      );
    } else {
      // If not selected, add to the list
      setSelectedCells((prevSelectedCells) => [...prevSelectedCells, cell]);
    }
  };

  const createTicketButtonClick = () => {
    let title = "";
    let shortDescription = document.getElementById(
      "create-shortDescription"
    ).value;
    let requestedBy = userId;
    // let userEmail = userInfo.email
    // let customerAvailability =
    //   document.getElementById("user-availability").value;
    let chosenCategory = document.getElementById("create-category").value;
    let userNotes = document.getElementById("create-notes").value;

    // const requestorMapping = {
    //   "Adam Cameron": 1,
    //   "Rachita Singh": 2,
    //   "Inaya Rajwani": 3,
    //   "Emily Chiu": 4,
    //   "Abee Allen": 5,
    // };

    const specialtyMapping = {
      Laptop: "computer",
      Desktop: "computer",
      Monitor: "computer",
      MobilePhone: "phone",
      LandlinePhone: "phone",
      Printer: "other",
      Tablet: "other",
    };

    if (
      !shortDescription ||
      !chosenCategory 
    ) {
      window.alert("Please fill out all required fields.");
      return;
    }

    setSchedule();

    createForm({
      title: title,
      requestor_id: requestedBy,
      category: specialtyMapping[chosenCategory],
      description: shortDescription,
      priority: "low",
      notes: userNotes,
    }); 

    let selectedCellsAlert = selectedCells
      .map(function (cell) {
        return "day " + cell.day + ", " + cell.time;
      })
      .join("\n");

    navigate('/home');
    // window.alert(
    //   shortDescription +
    //     "\n" +
    //     requestedBy +
    //     "\n Availability: \n" +
    //     selectedCellsAlert +
    //     "\n" +
    //     chosenCategory +
    //     "\n" +
    //     userEmail +
    //     "\n" +
    //     userNotes
    // );
  };

  return (
    <div className="page-background">
      <Header />
      <div className="sidebar-container">
        <div>
          <Sidebar />
        </div>
        <div className="body-container">
          <div className="ticket-background">
            <div className="ticket-form-card">
              <form action="" className="create-ticket-form">
                <div className="create-ticket-header">
                  <div className="create-ticket-title">Create Ticket</div>
                  <div className="create-ticket-buttons-container">
                    <div className="ticket-button">
                      <button
                        id="create-ticket-button"
                        type="button"
                        onClick={() => createTicketButtonClick()}
                      >
                        Create
                      </button>
                    </div>
                    <div className="ticket-button">
                      <button
                        id="cancel-ticket-button"
                        type="submit"
                        onClick={() => cancelCreateTicketButtonClick()}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>

                <div className="create-ticket-input-container">
                  <label for="create-shortDescription">Short description</label>
                  <input
                    id="create-shortDescription"
                    type="text"
                    required
                  />

                  <label for="create-category">Category</label>
                  <select id="create-category" name="category" required>
                    <option value="" selected disabled></option>
                    <option value="Laptop">Laptop</option>
                    <option value="Desktop">Desktop</option>
                    <option value="Monitor">Monitor</option>
                    <option value="MobilePhone">Mobile Phone</option>
                    <option value="LandlinePhone">Landline Phone</option>
                    <option value="Printer">Printer</option>
                    <option value="Tablet">Tablet</option>
                  </select>

                  {/* <label for="create-email">Email</label>
                  <input id="create-email" type="text" required /> */}

                  <label for="create-availability">Availability</label>
                  <div required>
                    <div>
                      <table
                        id="user-availability"
                        className="availabilityTable"
                      >
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
                                  className={
                                    selectedCells.some(
                                      (selectedCell) =>
                                        selectedCell.day === day &&
                                        selectedCell.time === time
                                    )
                                      ? "selected"
                                      : ""
                                  }
                                  onClick={() => cellClickEvent(day, time)}
                                ></td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <label for="create-notes">Notes</label>
                  <textarea id="create-notes" type="text" required />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


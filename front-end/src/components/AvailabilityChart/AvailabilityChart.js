import React, { useState } from 'react';
import styles from './availability-chart.css';

export default function AvailabilityChart() {
  const [selectedCells, setSelectedCells] = useState([]);
  const possibleTimes = ["9 am", "10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm"];

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

  return (
    <div>
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
  )
}

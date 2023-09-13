import React, { useState, useEffect } from 'react';
import './DigitalClock.css'; // Import the CSS file

const DigitalClock = () => {
  // State variables to store date and time values
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [ampm, setAmPm] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');

  // Function to update the date and time display
  const setDate = () => {
    const now = new Date();
    const mm = now.getMonth();
    const dd = now.getDate();
    const yyyy = now.getFullYear();
    const secs = now.getSeconds();
    const mins = now.getMinutes();
    let hrs = now.getHours();

    const monthName = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];

    if (hrs >= 12) {
      setAmPm('PM');
      if (hrs > 12) {
        hrs -= 12;
      }
    } else {
      setAmPm('AM');
      if (hrs === 0) {
        hrs = 12;
      }
    }

    setHours(hrs < 10 ? '0' + hrs : hrs);
    setSeconds(secs < 10 ? '0' + secs : secs);
    setMinutes(mins < 10 ? '0' + mins : mins);
    setMonth(monthName[mm]);
    setDay(dd);
    setYear(yyyy);
  };

  // Use useEffect to call setDate every second
  useEffect(() => {
    const interval = setInterval(setDate, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="digital_clock">
      <div className="date">
        <span className="month">{month}</span>
        <span className="day">{day},</span>
        <span className="year">{year}</span>
      </div>

      <div className="time">
        <span className="hours">{hours}</span>
        <span className="colon">:</span>
        <span className="minutes">{minutes}</span>
        <span className="colon">:</span>
        <span className="seconds">{seconds}</span>
        <span className="ampm">{ampm}</span>
      </div>
    </div>
  );
};

export default DigitalClock;

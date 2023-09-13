import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import DigitalClock from "./DigitalClock";

const BASE_URL = `http://localhost:2000/`;

const Lounge = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [tasks, setTasks] = useState([]); // State to manage tasks

  const handleLike = () => {
    setLikeCount(likeCount + 1);
  };

  useEffect(() => {
    // Load the stored tasks from local storage
    const storedTasks = localStorage.getItem('dragAndDropTasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }

    axios.get(`${BASE_URL}task`).then((response) => {
      console.log("data being fetched", response.data);
      setTasks(response.data);
    }).catch((error) => {
      console.log(error);
    });

    // Cleanup function to save to local storage before unmounting
    return () => {
      localStorage.setItem('dragAndDropTasks', JSON.stringify(tasks));
    };
  }, []); // Include tasks in the dependency array to properly save it when it changes

  // Extract unique owner usernames
  const uniqueOwners = [...new Set(tasks.map(task => task.owner.username))];

  return (
    <section>

       <DigitalClock className="owner-section" />
       <div className="owner-section"> <h2> on the work:</h2> </div>

       
      <div className="owner-section">
        
        {uniqueOwners.map((uniqueOwnerUsername, index) => {
          // Find the task associated with this unique owner
          const taskForOwner = tasks.find(task => task.owner.username === uniqueOwnerUsername);
          return (
            
            <div key={index} className="owner-section">
              
              <h2 className="owner-title">Owner: {uniqueOwnerUsername}</h2>
              {/* Display other owner information here */}
              <p className="owner-info">Other Information: {taskForOwner && taskForOwner.owner.role}</p>
            </div>
          );
        })}
      </div>

      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};

export default Lounge;

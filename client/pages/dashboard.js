import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/getLoggedInUser", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("usertoken")}`
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Welcome {user.firstName} {user.lastName}</h1>
      <p>Your email is {user.email}</p>
      <p>Your position is {user.position}</p>
    </div>
  );
};

export default Dashboard;



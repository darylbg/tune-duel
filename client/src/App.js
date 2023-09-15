import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    usernameInput: "",
    scoreInput: "",
  });

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = () => {
    axios
      .get("http://localhost:3001/")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
    // console.log(users);
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
  
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;
  }

  const handleUserSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/", {
        username: formData.usernameInput,
        score: formData.scoreInput,
        dateTime: new Date(),
      })
      .then((response) => {
        console.log(response);
        fetchUserList();
      })
      .catch((error) => {
        // console.log(error, "failure to add user and score");
      });
  };

  return (
    <div>
      <form onSubmit={handleUserSubmit}>
        <input
          type="text"
          name="usernameInput"
          placeholder="username"
          value={formData.usernameInput}
          onChange={handleFormChange}
        ></input>
        <input
          type="text"
          name="scoreInput"
          placeholder="score"
          value={formData.scoreInput}
          onChange={handleFormChange}
        ></input>
        <button type="submit">Submit</button>
      </form>
      <h1>hello world</h1>
      <ul>
        {users &&
          users.map((user, index) => (
            <li key={index}>
              <p>{user.username}</p>
              <p>{user.score}</p>
              <p>{formatDateTime(user.dateTime)}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;

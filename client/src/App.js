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
        console.log(error);
      });
    console.log(users);
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  function getCurrentDateTime() {
    const currentDate = new Date();

    const options = {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };

    const formattedDateTime = new Intl.DateTimeFormat("en-US", options).format(
      currentDate
    );
    return formattedDateTime;
  }

  const handleUserSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/", {
        username: formData.usernameInput,
        score: formData.scoreInput,
        dateTime: getCurrentDateTime(),
      })
      .then((response) => {
        console.log(response);
        fetchUserList();
      })
      .catch((error) => {
        console.log(error, "failure to add user and score");
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
              <p>{user.dateTime}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const inputHandler = (event) => {
    setInput(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setUsername(input);
  };

  const displayData = (data) => {
    props.dashboardHandler(data);
    navigate("/dashboard");
  };

  useEffect(() => {
    if (!username) return;
    fetch(`http://localhost:8000/api/v1/users/user/${username}`)
      .then((response) => response.json())
      .then((userData) => {
        if (!userData.data.user) {
          fetch("http://localhost:8000/api/v1/users/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username }),
          });
          navigate("/dashboard");
        } else {
          displayData(userData);
        }
      });
  }, [username]);

  return (
    <div className="home-container">
      <h2>Landing Page</h2>
      <form onSubmit={submitHandler}>
        <input
          onChange={inputHandler}
          value={input}
          type="text"
          placeholder="Enter Username"
        />
        <br />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Home;

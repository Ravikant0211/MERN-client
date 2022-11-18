import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AddTopic from "./pages/AddTopic";

import "./App.css";

const App = () => {
  const [userData, setUserData] = useState();

  const dashboardHandler = (data) => {
    setUserData(data);
  };

  return (
    <div className="container">
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={<Home dashboardHandler={dashboardHandler} />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard userData={userData} />}
          />
          <Route path="/addtopic" element={<AddTopic />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

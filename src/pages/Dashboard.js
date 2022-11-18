import React from "react";
import { Link, useLocation } from "react-router-dom";

const Dashboard = ({ userData }) => {
  const getLocation = useLocation();
  const id = getLocation.state.id;

  if (!userData) return;
  const topics = userData.data.user.topics;

  const topicList = topics.map((item, index) => {
    return (
      <div className="topic" key={`item-${index}`}>
        <span>{item.title} : </span>
        <span>{item.percentage.toFixed(2)}%</span>
      </div>
    );
  });

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="dashboard">
        <Link to="/addTopic" state={{ from: id }}>
          <button>Add Topic</button>
        </Link>
        <div className="topic-details">
          <p>Topic List:</p>
          {topicList}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

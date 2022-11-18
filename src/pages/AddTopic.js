import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AddTopic = () => {
  const navigate = useNavigate();
  const getLocation = useLocation();
  const { from } = getLocation.state;

  const [topicTitle, setTopicTitle] = useState("");
  const [textContent, setTextContent] = useState("");
  const [colorObj, setColorObj] = useState({
    greenCount: 0,
    redCount: 0,
    yellowCount: 0,
    pinkCount: 0,
  });

  const textHandler = (event) => {
    setTextContent(event.target.value);
    breakContent(event.target.value);
  };

  const topicTitleHandler = (event) => {
    setTopicTitle(event.target.value);
  };

  const breakContent = (data) => {
    const specialChars = /[`()\-[\]{};':"\\|,./?~]/;
    if (data !== "") {
      return data.split(specialChars).map((ele, index) => (
        <div className="tooltip" id={`item-${index}`}>
          {ele}
          <span className="tooltiptext">{colorProvider(`item-${index}`)}</span>
        </div>
      ));
    }
  };

  const colorCounterHandler = (event, idx) => {
    const id = event.target.id;
    let element = document.getElementById(idx);
    switch (id) {
      case "green": {
        setColorObj({ ...colorObj, greenCount: colorObj.greenCount + 1 });
        element.style.color = "green";
        break;
      }
      case "yellow": {
        setColorObj({ ...colorObj, yellowCount: colorObj.yellowCount + 1 });
        element.style.color = "yellow";
        break;
      }
      case "red": {
        setColorObj({ ...colorObj, redCount: colorObj.redCount + 1 });
        element.style.color = "red";
        break;
      }
      case "pink": {
        setColorObj({ ...colorObj, pinkCount: colorObj.redCount + 1 });
        element.style.color = "pink";
        break;
      }
      default:
        break;
    }
  };

  const colorProvider = (idx) => {
    return (
      <div onClick={(e) => colorCounterHandler(e, idx)} className="popover">
        <div id="green">Understood</div>
        <div id="yellow">Somewhat Understood</div>
        <div id="pink">Not Clear</div>
        <div id="red">What Rubbish</div>
      </div>
    );
  };

  const calculatePercentage = () => {
    let totalTextBlocks = 0;
    let totalPoints = 0;
    const green = 4;
    const yellow = 3;
    const pink = 2;
    const red = 1;

    for (let key in colorObj) {
      totalTextBlocks += colorObj[key];
      if (key === "greenCount") totalPoints += green * colorObj[key];
      else if (key === "yellowCount") totalPoints += yellow * colorObj[key];
      else if (key === "pinkCount") totalPoints += pink * colorObj[key];
      else if (key === "redCount") totalPoints += red * colorObj[key];
    }

    let percentage = (totalPoints / (totalTextBlocks * 4)) * 100;
    return percentage;
  };

  const saveContentHandler = (event) => {
    if (textContent && topicTitle) {
      event.preventDefault();
      const percentage = calculatePercentage();
      fetch("http://localhost:8000/api/v1/users/addtopic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: topicTitle,
          content: textContent,
          percentage: percentage,
          user: from, // user id
        }),
      });
      navigate("/");
    }
  };

  return (
    <div className="addtopic-container">
      <h2>Add Topic</h2>
      <form onSubmit={saveContentHandler}>
        <div className="title-container">
          <span>Topic</span>
          <input onChange={topicTitleHandler} type="text" />
        </div>
        <div className="addtopic">
          <div>
            <textarea
              className="text-area"
              onChange={textHandler}
              name="textarea"
              rows="3"
              cols="62"
            />
          </div>
          <div>
            <div className="text-content">{breakContent(textContent)}</div>
          </div>
        </div>
        <button type="submit" className="save-btn">
          Save
        </button>
      </form>
    </div>
  );
};

export default AddTopic;

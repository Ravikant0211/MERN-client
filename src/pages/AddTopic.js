// import React, { useState } from "react";
// import { Popover } from "antd";

// const AddTopic = () => {
//   const [topicTitle, setTopicTitle] = useState("");
//   const [textContent, setTextContent] = useState("");
//   const [flag, setFlag] = useState(false);
//   const [colorObj, setColorObj] = useState({
//     greenCount: 0,
//     redCount: 0,
//     yellowCount: 0,
//     pinkCount: 0,
//   });

//   const textHandler = (event) => {
//     setTextContent(event.target.value);
//     setFlag(true);
//     console.log(event.target.value);
//   };

//   const topicTitleHandler = (event) => {
//     setTopicTitle(event.target.value);
//   };

//   const breakContent = (Data) => {
//     console.log(Data);
//     return Data.split(/[,.\s]/).map((ele) => (
//       <Popover
//         placement="topCenter"
//         className="cursor-pointer"
//         content={colorProvider}
//         title=""
//       >
//         <span>{`${ele} `}</span>
//       </Popover>
//     ));
//   };

//   const colorCounterHandler = (event) => {
//     const id = event.target.id;
//     switch (id) {
//       case "green": {
//         const green = colorObj.greenCount + 1;
//         setColorObj({ ...colorObj, green });
//         break;
//       }
//       case "yellow": {
//         const yellow = colorObj.yellowCount + 1;
//         setColorObj({ ...colorObj, yellow });
//         break;
//       }
//       case "red": {
//         const red = colorObj.redCount + 1;
//         setColorObj({ ...colorObj, red });
//         break;
//       }
//       case "pink": {
//         const pink = colorObj.pinkCount + 1;
//         setColorObj({ ...colorObj, pink });
//         break;
//       }
//       default:
//         break;
//     }
//   };

//   const colorProvider = () => {
//     return (
//       <div onClick={colorCounterHandler}>
//         <button id="green">Green</button>
//         <button id="yellow">Yellow</button>
//         <button id="pink">Pink</button>
//         <button id="red">Red</button>
//       </div>
//     );
//   };

//   const saveContentHandler = (event) => {
//     event.preventDefault();
//     fetch("http://localhost:8000/api/v1/users/addtopic", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         title: topicTitle,
//         content: textContent,
//       }),
//     });
//   };

//   console.log(colorObj);

//   return (
//     <div>
//       <h2>Add Topic</h2>
//       <form onSubmit={saveContentHandler}>
//         <div>
//           <span>Topic</span>
//           <input onChange={topicTitleHandler} type="text" />
//         </div>
//         <textarea
//           onBlur={textHandler}
//           onFocus={() => setFlag(false)}
//           name="textarea"
//           rows="40"
//           cols="100"
//         />
//         {flag && <div>{breakContent(textContent)}</div>}
//         <button type="submit">Save</button>
//       </form>
//     </div>
//   );
// };

// export default AddTopic;

//==========================================================================================

import React, { useState, useRef } from "react";
// import ContentEditable from "react-contenteditable";
import { Popover } from "antd";
import TextArea from "antd/lib/input/TextArea";

const AddTopic = () => {
  const text = useRef("");
  const [topicTitle, setTopicTitle] = useState("");
  const [colorObj, setColorObj] = useState({
    greenCount: 0,
    redCount: 0,
    yellowCount: 0,
    pinkCount: 0,
  });

  // const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
  const breakContent = (Data) => {
    Data.split(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/).map((ele) => (
      <Popover
        placement="topCenter"
        className="cursor-pointer"
        content={colorProvider}
        title=""
      >
        <span>{ele}</span>
      </Popover>
    ));
  };

  const colorProvider = () => {
    return (
      <div onClick={colorCounterHandler}>
        <button id="green">Green</button>
        <button id="yellow">Yellow</button>
        <button id="pink">Pink</button>
        <button id="red">Red</button>
      </div>
    );
  };

  const colorCounterHandler = (event) => {
    const id = event.target.id;
    switch (id) {
      case "green": {
        const green = colorObj.greenCount + 1;
        setColorObj({ ...colorObj, green });
        break;
      }
      case "yellow": {
        const yellow = colorObj.yellowCount + 1;
        setColorObj({ ...colorObj, yellow });
        break;
      }
      case "red": {
        const red = colorObj.redCount + 1;
        setColorObj({ ...colorObj, red });
        break;
      }
      case "pink": {
        const pink = colorObj.pinkCount + 1;
        setColorObj({ ...colorObj, pink });
        break;
      }
      default:
        break;
    }
  };

  const topicTitleHandler = (event) => {
    setTopicTitle(event.target.value);
  };

  const saveContentHandler = (event) => {
    event.preventDefault();
    breakContent(text.current);
  };

  const handleSelection = (event) => {
    if (!event.target.value) return;
    const selection = event.target.value.substring(
      event.target.selectionStart,
      event.target.selectionEnd
    );
    console.log(selection);
  };

  return (
    <div>
      <h2>Add Topic</h2>
      <form onSubmit={saveContentHandler}>
        <div>
          <span>Topic</span>
          <input onChange={topicTitleHandler} type="text" />
        </div>
        {/* <ContentEditable
          html={text.current}
          // onBlur={handleBlur}
          onSelect={handleSelection}
          onChange={handleChange}
          className="editable"
        /> */}
        <TextArea ref={text} onSelect={handleSelection} cols="50" rows="30" />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddTopic;

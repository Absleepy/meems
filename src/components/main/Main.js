import React, { useEffect, useState } from "react";
import MemeImage from "./MemeImage";
import Data from "./Data";
import MemeSugguestions from "../MemeSetting";
import Button from "../button/Button";
import Sidebar from "../sidebar/sidebar";
const Main = () => {
  const memes = Data();
  const [randomObj, setRandomObj] = useState({});
  const [objects, setObjects] = useState([]);
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const [error, setError] = useState(false);
  const [popupStatus, setPopupStatus] = useState(false);
  const changeMeme = (meme) => {
    setRandomObj(meme);
  };

  //  random object
  useEffect(() => {
    setRandomObj(memes[Math.floor(Math.random() * memes.length)]);
  }, [memes]);

  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // add title
  const addTitle = () => {
    setError(false);
    if (objects.length > randomObj?.box_count - 1) {
      return;
    }
    setObjects([
      ...objects,
      {
        top: randomNumber(10, 100),
        left: randomNumber(10, 100),
        title: randomObj?.name,
      },
    ]);
  };

  // sidebar
  const toggleSidebar = () => {
    !objects.length ? setError(true) : setSidebarStatus(!sidebarStatus);
  };
  const showPopup = () => {
    setPopupStatus(!popupStatus);
  };
  const changeOb = (obj, e, i) => {
    console.log(obj);
  };
  const changeTitle = (e, i) => {
    changeOb(objects, e, i);
  };

  return (
    <div className="container-fluid my-3">
      <div className="row">
        <div className="col-md-6">
          <div className="meme-image-container">
            <MemeImage objects={objects} img={randomObj?.url} />
          </div>
        </div>
        <div className="col-md-6">
          <MemeSugguestions changeMeme={changeMeme} memes={memes} />
          <Button
            className="border border-info"
            text="Add Title"
            onClick={addTitle}
          />
          {error && (
            <div className="text-right">
              <span className={error ? "error" : " "}>
                Please Add Title To Edit
              </span>
            </div>
          )}
          <Button
            className="border border-info"
            text="Edit Title"
            onClick={toggleSidebar}
          />
        </div>
      </div>

      {/* sidebar */}
      <Sidebar
        showSidebar={sidebarStatus}
        onClose={toggleSidebar}
        sideData={objects}
        title={randomObj?.name}
        showPopup={showPopup}
        changeTitle={changeTitle}
        popupStatus={popupStatus}
      />
    </div>
  );
};

export default Main;

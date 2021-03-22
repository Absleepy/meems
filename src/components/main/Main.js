import React, { useEffect, useState } from "react";
import MemeImage from "./MemeImage";
import useData from "./useData";
import MemeSugguestions from "../MemeSetting";
import Button from "../button/Button";
import Sidebar from "../sidebar/sidebar";
const Main = () => {
  const [memes, loading] = useData();
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
        prop: {
          css: { color: "#ffffff", fontSize: "18" },
        },
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

  const changeTitle = (e, i) => {
    //i => index of array need to updated
    let { name: key, value } = e.target;

    if (key.includes(".")) {
      key = key.split(".");
    }
    console.log(key);

    // key = "title" value="whatever user in typing"

    // updating use map
    if (typeof key === "string")
      setObjects(
        objects.map((obj, index) =>
          index === i ? { ...obj, [key]: value } : obj
        )
      );
    else
      setObjects(
        objects.map((obj, index) => {
          if (index === i) {
            const data = { ...obj };
            const traverse = (data, i) => {
              Object.keys(data).map((k) => {
                if (k === key[i]) {
                  if (i === key.length - 1) {
                    data[k] = value;
                  } else traverse(data[k], i + 1);
                }
              });
            };
            traverse(data, 0);

            return { ...data };
          } else return obj;
        })
      );

    //test = [{title:"something 1"},{title:"something 2"},{title:"something 3"}]
    //for example i=2
    //updating direct

    // test[i] = {title:"something new"}
    //const key = "title"
    // console.log(test[i][key])

    // let newObjects = [...objects];
    // newObjects[i] = { ...newObjects[i], [key]: value };
    // setObjects(newObjects);
  };

  console.log(objects);
  return (
    <div className="container-fluid my-3">
      {loading && (
        <div className="spinner">
          <div className="head"></div>
        </div>
      )}
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

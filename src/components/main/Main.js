import React, { useEffect, useCallback, useState } from "react";
import MemeImage from "./MemeImage";
import useData from "./useData";
import MemeSugguestions from "../MemeSetting";
import Button from "../button/Button";
import { useDrop } from "react-dnd";
import Sidebar from "../sidebar/sidebar";
import update from "immutability-helper";
const Main = () => {
  const [memes, loading] = useData();
  const [randomObj, setRandomObj] = useState({});
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const [error, setError] = useState(false);
  const [popupStatus, setPopupStatus] = useState(false);
  const [addMoreTitles, setAddMoreTitles] = useState(true);
  const [lastObjectKey, setLastObjectKey] = useState(2);
  const changeMeme = (meme) => {
    setRandomObj(meme);
  };

  //  random object
  useEffect(() => {
    setRandomObj(memes[Math.floor(Math.random() * memes.length)]);
  }, [memes]);

  // main image
  const [boxes, setBoxes] = useState({
    1: { top: 20, left: 80, title: "title 1" },
  });

  const moveBox = useCallback(
    (id, left, top) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top },
          },
        })
      );
    },
    [boxes, setBoxes]
  );
  const [, drop] = useDrop(
    () => ({
      accept: "BOX",
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveBox(item.id, left, top);
        return undefined;
      },
    }),
    [moveBox]
  );
  // sidebar
  const toggleSidebar = () => {
    setSidebarStatus(!sidebarStatus);
  };
  const showPopup = () => {
    setPopupStatus(!popupStatus);
  };

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  const handleAddTitle = () => {
    if (addMoreTitles) {
      setLastObjectKey((x) => (x = x += 1));

      setBoxes({
        ...boxes,
        [lastObjectKey]: {
          top: getRandomInt(2, 200),
          left: getRandomInt(1, 398),
          title: `title ${lastObjectKey}`,
        },
      });
    }
  };
  const changeTitle = (e, keyToChange, index) => {
    const { value } = e.target;
    setBoxes({
      ...boxes,
      [index + 1]: { ...boxes[index + 1], [keyToChange]: value },
    });
  };

  const handleRemoveTitle = index => {

    const objs = { ...boxes }
    delete objs[index + 1];
    setBoxes({ ...objs })
  }
  // effects
  useEffect(() => {
    lastObjectKey > 5 && setAddMoreTitles(false);
  }, [lastObjectKey]); 
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
            <MemeImage handleRemoveTitle={handleRemoveTitle} drop={drop} img={randomObj?.url} boxes={boxes} />
          </div>
        </div>
        <div className="col-md-6">
          <MemeSugguestions changeMeme={changeMeme} memes={memes} />
          <Button
            onClick={handleAddTitle}
            className="border border-info"
            text="Add Title"
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
        changeTitle={changeTitle}
        showSidebar={sidebarStatus}
        sideData={boxes}
        onClose={toggleSidebar}
        title={randomObj?.name}
        showPopup={showPopup}
        popupStatus={popupStatus}
      />
    </div>
  );
};

export default Main;

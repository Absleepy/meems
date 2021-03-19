import React, { useState } from "react";
import { Close } from "./icons";
import "./memes.css";

const Sidebar = ({ showSidebar, sideData, closeSidebar }) => {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [popup, setPopup] = useState(false);
  const [fontSize, setFontSize] = useState(12);

  // don't set props in local state.. change them using a function call to there parent

  React.useEffect(() => {
    setData(sideData);
  }, [sideData]);
  const handleColor = (e) => {
    console.log(e.target.value);
  };
  const handleFontSize = (e) => {
    setFontSize({
      ...fontSize,
      size: e.target.value,
    });
  };

  //   input
  const handleTitleChange = (e, title) => {
    title = e.target.value;
  };

  const editTitle = () => {
    setPopup(!popup);
  };
  return (
    <div className={`sidebar ${showSidebar ? "showSidebar" : ""}`}>
      <div className="sidebar-header">
        <div className="d-flex align-items-center">
          <span onClick={closeSidebar} title="Close">
            <Close />
          </span>
        </div>
      </div>
      <div className="p-2 sidebar-body h-100">
        {data?.map((item, idx) => (
          <div
            key={idx}
            className="d-flex align-items-center justify-content-around"
          >
            <h2
              style={{
                fontSize: `${item?.fontSize}px`,
                flex: 1,
                color: `${item?.color}`,
              }}
            >
              {item?.title}
            </h2>
            <div className="position-relative">
              <button
                onClick={() => editTitle()}
                className="d-block btn myBtn text-white"
              >
                {idx === idx && popup ? <Close /> : "Edit"}
              </button>
              {popup && (
                <div className="position-absolute edit-popup">
                  <div className="d-flex flex-column">
                    <div className="d-flex align-items-center justify-content-evenly">
                      <input
                        id="colorPicker"
                        value={idx === idx ? item?.color : null}
                        onChange={(e) => handleColor(e)}
                        type="color"
                      />
                      <span>Color</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-evenly">
                      <input
                        id="range"
                        value={idx === idx ? fontSize.size : null}
                        onChange={(e) => handleFontSize(e, idx)}
                        type="range"
                        min={13}
                        max={40}
                      />
                      <span>Font Size</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-evenly">
                      <input
                        value={item?.title ?? ""}
                        className="meme-input w-100"
                        onChange={(e) => handleTitleChange(e, item?.title)}
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Sidebar;

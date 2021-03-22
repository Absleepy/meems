import React from "react";
import Button from "../button/Button";
import { Close } from "../icons";
import "../memes.css";

const Sidebar = ({
  showSidebar,
  popupStatus,
  sideData,
  showPopup,
  onClose,
  title,
  changeTitle,
}) => {
  const [idx, setIdx] = React.useState(0);
  const getIndex = (i) => {
    setIdx(i);
  };
  return (
    <div className={`sidebar ${showSidebar ? "showSidebar" : ""}`}>
      <div className="sidebar-header">
        <div className="d-flex align-items-center">
          <div>
            <button className="btn" onClick={onClose} title="Close">
              <Close />
            </button>
          </div>
          <div className="f1 text-center">Edit Title</div>
        </div>
      </div>
      <div className="p-2 sidebar-body h-100">
        {sideData?.map((item, i) => (
          <div key={i} className="my-3 d-flex align-items-center">
            <h4 className="f1">{item?.title}</h4>
            <div className="position-relative">
              <Button
                onClick={() => {
                  getIndex(i);
                  showPopup();
                }}
                text={popupStatus && idx === i ? <Close /> : "Edit"}
                className="border border-info"
              />
              {popupStatus && idx === i && (
                <div className="edit-popup position-absolute border border-info">
                  <input
                    type="text"
                    value={item?.title}
                    onChange={(e) => changeTitle(e, i)}
                    className="popup-input border-bottom bg-transparent w-100 text-white"
                  />
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

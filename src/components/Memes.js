import React, { useState } from "react";
import "./memes.css";
import axios from "axios";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Container } from "./Container";
import { DndProvider } from "react-dnd";
import MemeSetting from "./MemeSetting";
import Sidebar from "./sidebar";
const Memes = () => {
  const [memes, setMemes] = useState([]);
  const [randomObj, setRandomObj] = useState({});
  const [loading, setLoading] = useState(true);
  const [moreTitle, setMoreTitle] = useState([]);
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const [sideData, setSideData] = useState([]);
  const [error, setError] = useState(false);

  const url = "https://api.imgflip.com/get_memes";

  const getRandomObj = (res) => {
    return res.data.data.memes[
      Math.floor(Math.random() * res.data.data.memes.length)
    ];
  };
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        setLoading(true);
        setMemes(res.data.data.memes);
        setRandomObj(getRandomObj(res));
        return res;
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // plus button
  const handleClick = (obj) => {
    setRandomObj(obj);
  };

  // input
  const handleChange = (e) => {
    setRandomObj({
      ...randomObj,
      name: e.target.value,
    });
  };
  // meem titls
  const handleAddTitle = () => {
    setError(false);
    setSideData(moreTitle);
    setMoreTitle([
      ...moreTitle,
      {
        left: 54,
        top: 34,
        fontSize: 12,
        color: "#ffffff",
        title: randomObj?.name,
      },
    ]);
  };

  // sidebar
  const showSidebar = () => {
    setSideData(moreTitle);
    return moreTitle.length === 0
      ? setError(true)
      : (setError(false), setSidebarStatus(!sidebarStatus));
  };
  const closeSidebar = () => {
    setSidebarStatus(!sidebarStatus);
  };

  return (
    <div className="container-fluid">
      <div className="my-5">
        <h2 className="text-center">Memes</h2>
      </div>
      {loading && (
        <div className="spinner">
          <div className="head"></div>
        </div>
      )}
      <div className="row">
        <div className="col-md-6 position-relative">
          {memes.length > 0 && (
            <div className="meme-image overflow-hidden">
              <span className="titles-length">{moreTitle?.length}</span>
              <DndProvider backend={HTML5Backend}>
                <Container
                  moreTitle={moreTitle}
                  text={randomObj?.name}
                  img={randomObj?.url}
                  text={randomObj?.name}
                />
              </DndProvider>
            </div>
          )}
        </div>
        <div className="col-md-6">
          <div className="sugguested-meems">
            <div className="d-flex align-items-center sug-meens-cont">
              {memes?.map((mem) => (
                <div
                  onClick={() => handleClick(mem)}
                  className="sug-box"
                  key={mem.id.toString()}
                >
                  <img src={mem?.url} width="100%" alt="" />
                </div>
              ))}
            </div>
          </div>
          <div className="btn-container my-3 ">
            <button
              onClick={showSidebar}
              className="d-block btn myBtn text-white"
            >
              Edit
            </button>
            {error ? (
              <div className="text-right">
                <span className="text-danger">Please add title </span>
              </div>
            ) : null}
          </div>
          <div className="text-align-right">
            <Sidebar
              sideData={sideData}
              closeSidebar={closeSidebar}
              showSidebar={sidebarStatus}
            />
          </div>
          {memes.length > 0 && (
            <div className="meme-setting">
              <MemeSetting
                handleClick={handleAddTitle}
                handleChange={(e) => handleChange(e)}
                text={randomObj?.name}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Memes;

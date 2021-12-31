import React from "react";
import DragableCard from "./DragableCard";

const MemeImage = ({ img, boxes, drop, handleRemoveTitle }) => {
  return (
    <div
      className="meme-image"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100%",
      }}
      ref={drop}
    >
      {Object.keys(boxes).map((key, index) => {
        const { left, top } = boxes[key];
        return (
          <DragableCard
            key={key}
            index={index}
            id={key}
            left={left}
            top={top} 
            text={boxes}
            handleRemoveTitle={handleRemoveTitle}
          />
        );
      })}
    </div>
  );
};

export default MemeImage;

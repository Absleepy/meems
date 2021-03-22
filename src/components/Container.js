import React from "react";
import { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { ItemsTypes } from "./ItemsTypes";
import MemeTitle from "./MemeTitle";
import update from "immutability-helper";
export const Container = ({objects}) => { 
  console.log(objects);
  const [boxes, setBoxes] = useState({objects});
  React.useEffect(() =>{
    const empObj = {};
    objects?.map((obj, i) =>(
      empObj[i] = {
       ...obj
      }
    )) 
    setBoxes(empObj)
  },[objects]) 
   
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
      accept: ItemsTypes.BOX,
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
  return (
    <div
      ref={drop}
       className="h-100"
    >
      {Object.keys(boxes).map((key) => {
        const { left, top, title,prop } = boxes[key];
        return (
          <MemeTitle key={key} id={key} left={left} top={top}>
             <h4 style={{color: prop?.css?.font?.color, fontSize: `${prop?.css?.font?.fontSize}px`}} key={key} className="meme_img_text">{
            title
             }</h4>
          </MemeTitle>
        );
      })}
    </div>
  );
};

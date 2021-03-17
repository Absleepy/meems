import { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { ItemsTypes } from "./ItemsTypes";
import MemeImage from "./MemeImage";
import update from "immutability-helper";
 
export const Container = ({img, text}) => {
  const [boxes, setBoxes] = useState({
    a: { top: 20, left: 80, title: text}, 
    b: { top: 120, left: 180, title: text}, 
  });
  const moveBox = useCallback(
    (id, left, top) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top }
          }
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
      }
    }),
    [moveBox]
  );
  return (
    <div ref={drop} style={{position: "relative", backgroundImage: `url(${img})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", height: "100%"}}>
      {Object.keys(boxes).map((key) => {
        const { left, top } = boxes[key];
        return (
         
          <MemeImage key={key} id={key} left={left} top={top}>
            <h2  className="meme_img_text">{text}</h2>
          </MemeImage>
           
        );
      })}
    </div>
  );
};

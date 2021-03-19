import React from "react";
import { useDrag } from "react-dnd";
import { ItemsTypes } from "./ItemsTypes";
const MemeImage = ({ id, left, top, children }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemsTypes.BOX,
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top]
  );
  if (isDragging) {
    return <div ref={drag} />;
  }
  return (
    <div
      ref={drag}
      role="Box"
      className="overflow-hidden d-flex align-items-center justify-content-around flex-column"
      style={{ position: "absolute", cursor: "grab", left, top }}
    >
      {children}
    </div>
  );
};
export default MemeImage;

import { useDrag } from "react-dnd";
const style = {
  position: "absolute",
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  cursor: "move",
  color: "black",
};
export default function DragableCard({ id, left, key, top, text, index, handleRemoveTitle }) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "BOX",
      item: { id, left, top, text },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [left, top, id]
  );
  if (isDragging) {
    return <div ref={drag} />;
  }

  return (
    <div className="memeTitle" ref={drag} key={key} style={{ ...style, left, top }} role="Box">
      <div
        style={{
          color: text[index + 1]?.color,
          fontSize: `${text[index + 1]?.fontSize}px`,
          position: 'relative'
        }}
        
      >
        {text[index + 1]?.title}
        <button onClick={() => handleRemoveTitle(index)} className="removeBtn">
          &times;
        </button>
      </div>
    </div>
  );
}

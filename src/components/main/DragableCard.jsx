import { useDrag } from "react-dnd";
const style = {
  position: "absolute",
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  cursor: "move",
  color: "black",
};
export default function DragableCard({ id, left, key, top, text, index }) {
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
    <div ref={drag} key={key} style={{ ...style, left, top }} role="Box">
      <div
        style={{
          color: text[index + 1]?.color,
          fontSize: `${text[index + 1]?.fontSize}px`,
        }}
      >
        {text[index + 1].title}
      </div>
    </div>
  );
}

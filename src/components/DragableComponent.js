import React from 'react'
import { useDrag } from 'react-dnd'

 const DragableComponent = ({text}) => {
    const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
 
    type: 'BOX',
	 
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))
    return (
        <div ref={dragPreview} style={{ background: isDragging ? 'red' : '#fff'}}> 
            <div role="Handle" ref={drag}><h2 className="px-3">{text}</h2></div>
        </div>
    )
}
export default DragableComponent;
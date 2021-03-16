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
            <div role="Handle" ref={drag}>tester</div>
        </div>
    )
}
export default DragableComponent;
import React from 'react'
import { HTML5Backend } from "react-dnd-html5-backend";
import { Container } from "../Container";
import { DndProvider } from "react-dnd"; 
const MemeImage = ({img, objects, title}) => { 
     
    return ( 
       <div className="meme-image" style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100%",
       }}>
           <DndProvider backend={HTML5Backend}>
            <Container objects={objects} title={title}/>
            </DndProvider>
       </div>
    )
}

export default MemeImage

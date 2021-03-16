import React, {useState} from 'react';
import './memes.css'; 
import axios from 'axios'; 
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import DragableComponent from './DragableComponent';
 const Memes = () => {
    const [memes, setMemes] = useState([]); 
    const url = 'https://api.imgflip.com/get_memes';

React.useEffect(() =>{
    const fetchData = async () => {
        try{
            const res = await axios.get(url);
            setMemes(res.data.data.memes);
            return res;
        }
        catch(err){
            console.error(err);
        }
    }
    fetchData();
},[])  
const randomImage = memes[Math.floor(Math.random() * memes.length)]



    return (
        <div className="container">
           
         <div className="row">
            <div className="col-md-6">
                <div className="d-flex align-items-center justify-content-center" style={{backgroundImage: `url(${randomImage?.url})`, backgroundSize: "cover", backgroundPosition: "center", height: "500px", objectFit: "contain", }}>
                    
                <DndProvider backend={HTML5Backend}> <DragableComponent  /></DndProvider>
                </div>
            </div>
            <div className="col-md-6">
            
            </div>
         </div>
        </div>
    )
}
export default Memes;
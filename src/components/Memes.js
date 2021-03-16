import React, {useState} from 'react';
import './memes.css'; 
import axios from 'axios'; 
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import DragableComponent from './DragableComponent';
 const Memes = () => {
    const [memes, setMemes] = useState([]); 
    const [randomImg, setRandomImg] = useState({})


    const url = 'https://api.imgflip.com/get_memes';

React.useEffect(() =>{
    
    const fetchData = async () => {
        try{
            const res = await axios.get(url);
            setMemes(res.data.data.memes); 
            setRandomImg(memes[Math.floor(Math.random() * memes.length)])
            console.log(res);
            return res;
        }
        catch(err){
            console.error(err);
        }
        
    }
    fetchData(); 

},[])  

    
 
 
const handleClick = obj =>{ 
   setRandomImg(obj); 
   console.log(obj);
}



    return (
        <div className="container">
           <div className="my-5"> 
               <h2 className="text-center">Make your own meems</h2>
           </div>
         <div className="row">
            <div className="col-md-6"> 
                <div className="d-flex align-items-center justify-content-around flex-column" style={{backgroundImage: `url(${randomImg?.url})`, backgroundSize: "cover", backgroundPosition: "center", height: "500px", objectFit: "contain", }}>
              
                <DndProvider backend={HTML5Backend}> <DragableComponent  text="test"/></DndProvider>
                <DndProvider backend={HTML5Backend}> <DragableComponent  text="test two"/></DndProvider>
                </div>
            </div>
            <div className="col-md-6">
            <div className="sugguested-meems">
                <div className="d-flex align-items-center sug-meens-cont">
                 {
                memes?.map(mem =>(
                    <div onClick={() => handleClick(mem)} className="sug-box" key={mem.id.toString()}>
                        <img src={mem?.url} width="100%" alt=""/>
                    </div>
                ))
                 }
                </div>

            </div>
            </div>
         </div>
        </div>
    )
}
export default Memes;
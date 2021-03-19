import React, {useState} from 'react';
import './memes.css';  
import axios from 'axios'; 
import { HTML5Backend } from 'react-dnd-html5-backend';
 
 const Memes = () => {
     
    const url = 'https://api.imgflip.com/get_memes';

    const getRandomObj = (res) =>{
        return res.data.data.memes[Math.floor(Math.random() * res.data.data.memes.length)]
    }
 
  
  
    return "test"
}
export default Memes;
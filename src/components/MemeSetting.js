import React from 'react'  

 const MemeSetting = ({text, handleChange, handleClick}) => { 
    
   
  
    return (
        <div>
            <div className="my-2 text-right"><button className="btn myBtn text-white" onClick={handleClick} title="Add Title">Add</button></div>
           <div className="w-100 mt-1">
            <input type="text" className="meme-input w-100" maxLength="45" onChange={handleChange} value={text ?? ""} />  
             
            </div>
        </div>
    )
}
export default MemeSetting;
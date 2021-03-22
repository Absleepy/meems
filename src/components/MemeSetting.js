import React from 'react'  

 const MemeSugguestions = ({memes, changeMeme}) => { 
    
   
  
    return ( 
          <div className="sugguested-meems">
            <div className="d-flex align-items-center sug-meens-cont">
              {memes?.map((meme) => (
                <div 
                onClick={() => changeMeme(meme)}
                  className="sug-box"
                  key={meme.id.toString()}
                >
                  <img src={meme?.url} width="100%" alt="" />
                </div>
              ))}
            </div>
          </div>
            
    )
}
export default MemeSugguestions;
import React,{useState} from 'react'
import axios from "axios";

const Data = () => {
    const [memes, setMemes] = useState([]); 
    const [loading, setLoading] = useState(true);
     
      const url = "https://api.imgflip.com/get_memes";
    React.useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(url);
            setLoading(true);
            setMemes(res.data.data.memes); 
            return res;
          } catch (err) {
            console.error(err);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
      }, []);
    
    return memes 
}

export default Data

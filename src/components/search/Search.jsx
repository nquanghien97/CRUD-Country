import { useState, useEffect } from 'react'
import axios from 'axios'

function Search() {

    const [data, setData] = useState({
        name: "",
        results: []
      });
      
      useEffect(() => {
        if (data.slug !== "") {
          const timeoutId = setTimeout(() => {
            const fetch = async () => {
              try {
                const res = await axios.get(`https://62a591d8b9b74f766a3ba5db.mockapi.io/api/country?name=${data.name}`);
                setData({ ...data, results: res.data });
              } catch (err) {
                console.error(err);
              }
            };
            fetch();
          }, 1000);
          return () => clearTimeout(timeoutId);
        }
      }, [data.name]);
    
      return { data, setData };
}

export default Search
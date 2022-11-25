import React, {useState, createContext, useEffect } from "react";
import axios from "axios";

export const ListContext = createContext();

const ListStore = (props) => {

  const [list, setList] = useState([]);
  const [airlineNFT, setAirlineNFT] = useState([]);
  console.log(airlineNFT)

  // 1. useEffect로 list를 불러온다.
/*   useEffect(() => {
    axios.get("http://localhost:5001/marketplace/ticket",).then(res => {
      const array = res.data;
      const filteredArr = [...array].filter((item) => {
        return item.to == "CDG";
      });
      setList(filteredArr);
    })
  }, []); */

  // 1. 서치를 해서, 



  // useState React hook
  return (
    <ListContext.Provider value={{list,setList, airlineNFT, setAirlineNFT}}>
      {props.children}
    </ListContext.Provider>
  )
}

export default ListStore;
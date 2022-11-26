import React, {useState, createContext, useEffect } from "react";
import axios from "axios";

export const ListContext = createContext();

const ListStore = (props) => {

  const [list, setList] = useState([]);
  const [airlineNFT, setAirlineNFT] = useState([]);
  const [listAll, setListAll] = useState([]);

  // useState React hook
  return (
    <ListContext.Provider value={{
      list,
      setList,
      airlineNFT,
      setAirlineNFT,
      listAll,
      setListAll}}>
      {props.children}
    </ListContext.Provider>
  )
}

export default ListStore;
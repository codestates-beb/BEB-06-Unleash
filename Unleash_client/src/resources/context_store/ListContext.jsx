import React, {useState, createContext, useEffect } from "react";
import axios from "axios";

export const ListContext = createContext();

const ListStore = (props) => {
  const [userData, setUserData] = useState([]);
  const [loginStatus, setLoginStatus] = useState([]);
  const [list, setList] = useState([]);
  const [p2pMarketList, setP2pMarketList] = useState([]);
  const [airlineNFT, setAirlineNFT] = useState([]);
  const [listAll, setListAll] = useState([]);
  const [p2pNFT, setP2pNFT] = useState([]);
  const [accountNFT, setAccountNFT] = useState([]);

  // useState React hook
  return (
    <ListContext.Provider value={{
      list,
      setList,
      airlineNFT,
      setAirlineNFT,
      listAll,
      setListAll,
      p2pMarketList,
      setP2pMarketList,
      p2pNFT,
      setP2pNFT,
      accountNFT,
      setAccountNFT}}>
      {props.children}
    </ListContext.Provider>
  )
}

export default ListStore;
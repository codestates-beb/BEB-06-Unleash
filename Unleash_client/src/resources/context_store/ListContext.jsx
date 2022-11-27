import React, {useState, createContext } from "react";

export const ListContext = createContext();

const ListStore = (props) => {
  const [userData, setUserData] = useState([]);
  const [loginStatus, setLoginStatus] = useState([]);
  const [list, setList] = useState([]);
  const [p2pMarketList, setP2pMarketList] = useState([]);
  const [listAll, setListAll] = useState([]);
  const [accountNFT, setAccountNFT] = useState([]);

  // useState React hook
  return (
    <ListContext.Provider value={{
      list,
      setList,
      listAll,
      setListAll,
      p2pMarketList,
      setP2pMarketList,
      accountNFT,
      setAccountNFT,
      userData,
      setUserData,
      loginStatus,
      setLoginStatus}}>
      {props.children}
    </ListContext.Provider>
  )
}

export default ListStore;
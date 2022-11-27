import React, {useState, createContext, useEffect } from "react";

export const ListContext = createContext();

const ListStore = (props) => {

  const [list, setList] = useState([1,2,3,4,5]);
  const [userData, setUserData] = useState([]);
  const [loginStatus, setLoginStatus] = useState([]);



  // useState React hook
  return (
    <ListContext.Provider value={{list,setList,userData,setUserData , setLoginStatus , loginStatus}}>
      {props.children}
    </ListContext.Provider>
  )
}

export default ListStore;
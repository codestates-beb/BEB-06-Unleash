import React, {useState, createContext, useEffect } from "react";

export const ListContext = createContext();

const ListStore = (props) => {

  const [list, setList] = useState([1,2,3,4,5]);
  // 1. useEffect로 list를 불러온다.

  const a = (v) => {
    setList(v);
  }

  // useState React hook
  return (
    <ListContext.Provider value={{list,setList, a}}>
      {props.children}
    </ListContext.Provider>
  )
}

export default ListStore;
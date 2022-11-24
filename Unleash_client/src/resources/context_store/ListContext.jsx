import React, {useState, createContext, useEffect } from "react";

export const ListContext = createContext();

const ListStore = (props) => {

  const [list, setList] = useState([1,2,3,4,5]);

  // useState React hook
  useEffect(() => {
    // listItem 을 처음에 설정하면됨. 불러오느거.
    if (localStorage.getItem("ticketList")) {
      setList(localStorage.getItem("ticketList"))
    } else {
      localStorage.setItem("ticketList", list)
    }
  }, []);

  return (
    <ListContext.Provider value={{list}}>
      {props.children}
    </ListContext.Provider>
  )
}

export default ListStore;
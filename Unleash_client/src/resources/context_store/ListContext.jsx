import { createContext } from "react";

export const AppContext = createContext();

const ListStore = (props) => {
  return (
    <AppContext.Provider value={'hi'}>
      {props.children}
    </AppContext.Provider>
  )
}

export default ListStore;
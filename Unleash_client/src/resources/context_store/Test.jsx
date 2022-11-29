import React, { useState, createContext } from 'react';

export const TestContext = createContext();

const Test = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  return (
    <TestContext.Provider value={{ isOpen, setIsOpen, isOpen2, setIsOpen2 }}>
      {props.children}
    </TestContext.Provider>
  );
};

export default Test;

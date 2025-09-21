import React, { createContext, useContext, useState } from "react";

const SpecialInstructionContext = createContext();

export function SpecialInstructionProvider({ children }) {
  const [specialInstruction, setSpecialInstruction] = useState(null);
  const [takeAwayDate, setTakeAwayDate] = useState(null);
  const [takeAwayTime, setTakeAwayTime] = useState(null);
  const [takeAwayOrderNote, setTakeAwayOrderNote] = useState(null);

  return (
    <SpecialInstructionContext.Provider value={{ specialInstruction, setSpecialInstruction, takeAwayDate, setTakeAwayDate, takeAwayTime, setTakeAwayTime, takeAwayOrderNote, setTakeAwayOrderNote }}>
      {children}
    </SpecialInstructionContext.Provider>
  );
}

export function useSpecialInstructionContext() {
  return useContext(SpecialInstructionContext);
}

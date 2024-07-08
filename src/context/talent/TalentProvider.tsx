import React, { createContext, useState } from "react";

import { TalentContextType } from "@/context/talent/model";
import { TalentConfirmationPayload } from "@/model/types";

const TalentContext = createContext<TalentContextType>({
  currentTalent: null,
  setCurrentTalent: () => {},
});

interface Props {
  children: React.ReactNode;
}

const TalentProvider: React.FC<Props> = ({ children }) => {
  const [currentTalent, setCurrentTalent] =
    useState<TalentConfirmationPayload | null>(null);

  return (
    <TalentContext.Provider value={{ currentTalent, setCurrentTalent }}>
      {children}
    </TalentContext.Provider>
  );
};

export { TalentContext, TalentProvider };

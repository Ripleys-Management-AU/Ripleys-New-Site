import { TalentConfirmationPayload } from "@/model/types";

export interface TalentContextType {
  currentTalent: TalentConfirmationPayload | null;
  setCurrentTalent: React.Dispatch<
    React.SetStateAction<TalentConfirmationPayload | null>
  >;
}

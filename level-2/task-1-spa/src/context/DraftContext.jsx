import { createContext, useContext, useMemo, useState } from "react";

const emptyDraft = { name: "", email: "", message: "" };

const DraftContext = createContext(null);

export function DraftProvider({ children }) {
  const [draft, setDraft] = useState(emptyDraft);

  const value = useMemo(
    () => ({
      draft,
      updateDraft(partial) {
        setDraft((current) => ({ ...current, ...partial }));
      },
      clearDraft() {
        setDraft(emptyDraft);
      },
    }),
    [draft],
  );

  return <DraftContext.Provider value={value}>{children}</DraftContext.Provider>;
}

export function useDraft() {
  const context = useContext(DraftContext);
  if (!context) throw new Error("useDraft must be used inside DraftProvider");
  return context;
}

import { createContext, useContext, useState, type ReactNode } from 'react';

interface PresentationContextValue {
  isPresentation: boolean;
  setIsPresentation: (v: boolean) => void;
}

const PresentationContext = createContext<PresentationContextValue>({
  isPresentation: false,
  setIsPresentation: () => {},
});

export function PresentationProvider({ children }: { children: ReactNode }) {
  const [isPresentation, setIsPresentation] = useState(false);
  return (
    <PresentationContext.Provider value={{ isPresentation, setIsPresentation }}>
      {children}
    </PresentationContext.Provider>
  );
}

export function usePresentation() {
  return useContext(PresentationContext);
}

import { createContext, useContext } from 'react';

export const SectionContext = createContext({
  activeSection: 'hero',
  setActiveSection: () => {},
});

export const useSectionContext = () => useContext(SectionContext);

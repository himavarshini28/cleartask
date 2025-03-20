import { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [selectedPage, setSelectedPage] = useState('Dashboard');
  return (
    <SidebarContext.Provider value={{ selectedPage, setSelectedPage }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);

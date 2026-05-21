import { createContext, useContext, useState } from "react";

const ChartInputSidebarContext = createContext(null);

export function ChartInputSidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((v) => !v);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  return (
    <ChartInputSidebarContext.Provider value={{ isOpen, toggle, close, open }}>
      {children}
    </ChartInputSidebarContext.Provider>
  );
}

export function useChartInputSidebar() {
  return useContext(ChartInputSidebarContext);
}

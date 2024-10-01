import { createContext, useContext, useState } from 'react';
import { SiderContextType, SiderProviderProps } from '../../models/Types';

const SiderContext = createContext<SiderContextType | undefined>(undefined);

export const SiderProvider: React.FC<SiderProviderProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggleSider = () => {
    setCollapsed(!collapsed);
  };

  return <SiderContext.Provider value={{ collapsed, toggleSider }}>{children}</SiderContext.Provider>;
};

export const useSider = (): SiderContextType => {
  const context = useContext(SiderContext);
  if (!context) throw new Error('useSider must be used within a SiderProvider');
  return context;
};

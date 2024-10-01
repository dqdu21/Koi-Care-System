import { ReactNode } from 'react';

export type SiderContextType = {
  collapsed: boolean;
  toggleSider: () => void;
};

export type SiderProviderProps = {
  children: ReactNode;
};

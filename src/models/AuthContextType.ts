import { User } from "./Types";

export interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    setUser: React.Dispatch<React.SetStateAction< User | null>>;
    getRole: () => string | null;
  }
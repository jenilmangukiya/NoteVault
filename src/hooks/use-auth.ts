import { AuthUser } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

interface AuthState {
  isAuthenticated: boolean;
  user: null | AuthUser;
  login: (user: any) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthState>({
  isAuthenticated: false,
  user: null,
  login: (user: AuthUser) => {},
  logout: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Can not use useAuth outside Auth Provider");

  return context;
};

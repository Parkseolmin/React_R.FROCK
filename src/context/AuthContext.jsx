import { createContext, useContext, useEffect, useState } from "react";
import { login, logout, onUserStateChange } from "api/firebase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true); // 로딩있음

  useEffect(() => {
    onUserStateChange((user) => {
      setIsLoading(false); // 로딩없음
      setUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, uid: user && user.uid, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);

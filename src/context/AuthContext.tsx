import React, { createContext, useState } from "react";

interface AuthContextProps {
  authority: string;
  setAuthority: (color: string) => void;
}

const AuthContext = createContext<AuthContextProps>({
  authority: "false",
  setAuthority: () => {},
});

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [authority, setAuthority] = useState("false");

  const valueToShare = {
    authority,
    setAuthority,
  };

  return (
    <AuthContext.Provider value={valueToShare}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

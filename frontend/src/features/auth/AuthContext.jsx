import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(undefined);

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    const storedUser =
      localStorage.getItem("user");

    // SAFE CHECK
    if (
      token &&
      storedUser &&
      storedUser !== "undefined"
    ) {

      setUser(
        JSON.parse(storedUser)
      );

    } else {

      setUser(null);

      localStorage.removeItem(
        "user"
      );

      localStorage.removeItem(
        "token"
      );
    }

  }, []);

  // LOGIN
  const login = (data) => {

    const {
      accessToken,
      refreshToken,
      ...userData
    } = data;

    setUser(userData);

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "token",
      accessToken
    );
  };
  
  // LOGOUT
  const logout = () => {

    setUser(null);

    localStorage.removeItem("user");

    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;